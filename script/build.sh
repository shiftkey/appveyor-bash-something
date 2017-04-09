
if [ "$TARGET_PLATFORM" == "ubuntu" ]; then
  echo "Building Git for Ubuntu"
elif [ "$TARGET_PLATFORM" == "macOS" ]; then
  echo "Building Git for macOS"
elif [ "$TARGET_PLATFORM" == "win32" ]; then
  echo "Building Git for Windows"
else
  echo "Unable to build Git for platform $TARGET_PLATFORM"
  exit 1
fi
