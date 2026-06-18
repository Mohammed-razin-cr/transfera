#!/bin/sh
set -e

OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case "$ARCH" in
    x86_64) ARCH="amd64" ;;
    aarch64|arm64) ARCH="arm64" ;;
    *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

RELAY="__GATEWAY_URL__"
URL="https://github.com/Sanyam-G/Transfera/releases/latest/download/transfera-${OS}-${ARCH}"

echo "Downloading transfera for ${OS}-${ARCH}..."
curl -sL "$URL" -o /tmp/transfera
chmod +x /tmp/transfera

# Install to /usr/local/bin, use sudo if needed
if [ -w /usr/local/bin ]; then
    mv /tmp/transfera /usr/local/bin/transfera
    echo "Installed to /usr/local/bin/transfera"
else
    echo "Need sudo to install to /usr/local/bin"
    sudo mv /tmp/transfera /usr/local/bin/transfera
    echo "Installed to /usr/local/bin/transfera"
fi

echo "Done! Run: transfera send <file>"

if [ "$RELAY" != "https://transfera.sanyamgarg.com" ] && [ "$RELAY" != "__GATEWAY_URL__" ]; then
    case "$SHELL" in
        */zsh)  RC="$HOME/.zshrc" ;;
        */bash) RC="$HOME/.bashrc" ;;
        *)      RC="" ;;
    esac

    echo
    if [ -n "$RC" ] && [ -e /dev/tty ]; then
        printf "Add 'export TRANSFERA_RELAY=%s' to %s? [y/N] " "$RELAY" "$RC"
        read REPLY < /dev/tty
        case "$REPLY" in
            [yY]*)
                echo "export TRANSFERA_RELAY=$RELAY" >> "$RC"
                echo "Added. Restart your shell or run: export TRANSFERA_RELAY=$RELAY"
                exit 0
                ;;
        esac
    fi
    echo "To use this relay by default:"
    echo "  export TRANSFERA_RELAY=$RELAY"
fi
