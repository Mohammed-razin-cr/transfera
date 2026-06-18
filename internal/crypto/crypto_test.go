package crypto

import (
	"bytes"
	"testing"
)

func TestGenerateKey(t *testing.T) {
	key, err := GenerateKey()
	if err != nil {
		t.Fatalf("GenerateKey failed: %v", err)
	}
	if len(key) != KeySize {
		t.Fatalf("expected key length %d, got %d", KeySize, len(key))
	}

	key2, _ := GenerateKey()
	if bytes.Equal(key, key2) {
		t.Fatal("two generated keys should not be equal")
	}
}

func TestGenerateNonce(t *testing.T) {
	nonce, err := GenerateNonce()
	if err != nil {
		t.Fatalf("GenerateNonce failed: %v", err)
	}
	if len(nonce) != NonceSize {
		t.Fatalf("expected nonce length %d, got %d", NonceSize, len(nonce))
	}
}

func TestKeyBase64Roundtrip(t *testing.T) {
	key, _ := GenerateKey()
	encoded := KeyToBase64(key)
	decoded, err := KeyFromBase64(encoded)
	if err != nil {
		t.Fatalf("KeyFromBase64 failed: %v", err)
	}
	if !bytes.Equal(key, decoded) {
		t.Fatal("key roundtrip through base64 failed")
	}
}

func TestEncryptDecryptRoundtrip(t *testing.T) {
	key, _ := GenerateKey()
	plaintext := []byte("hello airpipe")

	ciphertext, err := Encrypt(plaintext, key)
	if err != nil {
		t.Fatalf("Encrypt failed: %v", err)
	}

	if bytes.Equal(plaintext, ciphertext) {
		t.Fatal("ciphertext should differ from plaintext")
	}

	decrypted, err := Decrypt(ciphertext, key)
	if err != nil {
		t.Fatalf("Decrypt failed: %v", err)
	}

	if !bytes.Equal(plaintext, decrypted) {
		t.Fatalf("expected %q, got %q", plaintext, decrypted)
	}
}

func TestEncryptDecryptLargePayload(t *testing.T) {
	key, _ := GenerateKey()
	plaintext := make([]byte, 64*1024) // 64KB chunk
	for i := range plaintext {
		plaintext[i] = byte(i % 256)
	}

	ciphertext, err := Encrypt(plaintext, key)
	if err != nil {
		t.Fatalf("Encrypt failed: %v", err)
	}

	decrypted, err := Decrypt(ciphertext, key)
	if err != nil {
		t.Fatalf("Decrypt failed: %v", err)
	}

	if !bytes.Equal(plaintext, decrypted) {
		t.Fatal("large payload roundtrip failed")
	}
}

func TestDecryptWrongKey(t *testing.T) {
	key1, _ := GenerateKey()
	key2, _ := GenerateKey()

	ciphertext, _ := Encrypt([]byte("secret"), key1)
	_, err := Decrypt(ciphertext, key2)
	if err == nil {
		t.Fatal("expected decryption to fail with wrong key")
	}
}

func TestEncryptInvalidKeySize(t *testing.T) {
	_, err := Encrypt([]byte("data"), []byte("short"))
	if err == nil {
		t.Fatal("expected error for invalid key size")
	}
}

func TestDecryptInvalidKeySize(t *testing.T) {
	_, err := Decrypt([]byte("xxxxxxxxxxxxxxxxxxxxxxxxx"), []byte("short"))
	if err == nil {
		t.Fatal("expected error for invalid key size")
	}
}

func TestDecryptTooShort(t *testing.T) {
	key, _ := GenerateKey()
	_, err := Decrypt([]byte("short"), key)
	if err == nil {
		t.Fatal("expected error for short ciphertext")
	}
}

func TestEncryptNondeterministic(t *testing.T) {
	key, _ := GenerateKey()
	plaintext := []byte("same input")

	ct1, _ := Encrypt(plaintext, key)
	ct2, _ := Encrypt(plaintext, key)

	if bytes.Equal(ct1, ct2) {
		t.Fatal("encrypting same plaintext should produce different ciphertexts (random nonce)")
	}
}
