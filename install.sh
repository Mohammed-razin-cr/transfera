#!/bin/sh
set -e

OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case "$ARCH" in
    x86_64) ARCH="amd64" ;;
    aarch64|arm64) ARCH="arm64" ;;
    *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

URL="https://github.com/Sanyam-G/Airpipe/releases/latest/download/airpipe-${OS}-${ARCH}"

echo "Downloading airpipe for ${OS}-${ARCH}..."
curl -sL "$URL" -o /tmp/airpipe
chmod +x /tmp/airpipe

# Install to /usr/local/bin, use sudo if needed
if [ -w /usr/local/bin ]; then
    mv /tmp/airpipe /usr/local/bin/airpipe
    echo "Installed to /usr/local/bin/airpipe"
else
    echo "Need sudo to install to /usr/local/bin"
    sudo mv /tmp/airpipe /usr/local/bin/airpipe
    echo "Installed to /usr/local/bin/airpipe"
fi

echo "Done! Run: airpipe send <file>"
