#!/bin/sh
set -e

OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case "$ARCH" in
    x86_64) ARCH="amd64" ;;
    aarch64|arm64) ARCH="arm64" ;;
    *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

URL="https://github.com/Mohammed-razin-cr/transfera/releases/latest/download/transfera-${OS}-${ARCH}"

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
