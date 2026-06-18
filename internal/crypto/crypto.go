package crypto

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"io"

	"golang.org/x/crypto/nacl/secretbox"
)

const (
	KeySize   = 32
	NonceSize = 24
)

func GenerateKey() ([]byte, error) {
	key := make([]byte, KeySize)
	if _, err := io.ReadFull(rand.Reader, key); err != nil {
		return nil, err
	}
	return key, nil
}

func GenerateNonce() ([]byte, error) {
	nonce := make([]byte, NonceSize)
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, err
	}
	return nonce, nil
}

func KeyToBase64(key []byte) string {
	return base64.RawURLEncoding.EncodeToString(key)
}

func KeyFromBase64(encoded string) ([]byte, error) {
	return base64.RawURLEncoding.DecodeString(encoded)
}

func Encrypt(plaintext, key []byte) ([]byte, error) {
	if len(key) != KeySize {
		return nil, errors.New("invalid key size")
	}
	nonce, err := GenerateNonce()
	if err != nil {
		return nil, err
	}
	var keyArray [KeySize]byte
	var nonceArray [NonceSize]byte
	copy(keyArray[:], key)
	copy(nonceArray[:], nonce)
	encrypted := secretbox.Seal(nonce, plaintext, &nonceArray, &keyArray)
	return encrypted, nil
}

func Decrypt(ciphertext, key []byte) ([]byte, error) {
	if len(key) != KeySize {
		return nil, errors.New("invalid key size")
	}
	if len(ciphertext) < NonceSize {
		return nil, errors.New("ciphertext too short")
	}
	var keyArray [KeySize]byte
	var nonceArray [NonceSize]byte
	copy(keyArray[:], key)
	copy(nonceArray[:], ciphertext[:NonceSize])
	plaintext, ok := secretbox.Open(nil, ciphertext[NonceSize:], &nonceArray, &keyArray)
	if !ok {
		return nil, errors.New("decryption failed")
	}
	return plaintext, nil
}

func EncryptChunk(chunk, key []byte) ([]byte, error) {
	return Encrypt(chunk, key)
}

func DecryptChunk(encryptedChunk, key []byte) ([]byte, error) {
	return Decrypt(encryptedChunk, key)
}
