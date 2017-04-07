
if [ "$PLATFORM" == "ubuntu" ]; then
  echo "Building Git for Ubuntu"
elif [ "$PLATFORM" == "macOS" ]; then
  echo "Building Git for macOS"
elif [ "$PLATFORM" == "win32" ]; then
  echo "Building Git for Windows"
else
  echo "Unable to build Git for platform $PLATFORM"
  exit 1
fi
