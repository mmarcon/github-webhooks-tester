#!/bin/sh

CWD=`pwd`
GITHUB_REPO_ZIP="https://github.com/github/developer.github.com/archive/master.zip"
EVENT_FILES="developer.github.com-master/lib/webhooks"
TMP_DIR=`mktemp -d /tmp/repo.XXXXXX`
DEST_DIR="${CWD}/events"

echo "Fetching zip file"
curl -L -o $TMP_DIR/master.zip $GITHUB_REPO_ZIP > /dev/null
echo "Extracting zip file"
unzip -d $TMP_DIR $TMP_DIR/master.zip > /dev/null
echo "Moving files"
for f in `ls $TMP_DIR/$EVENT_FILES`; do
    dest=${f/.payload}
    mv $TMP_DIR/$EVENT_FILES/$f $DEST_DIR/$dest
done
echo "Cleaning up"
rm -rf $TMP_DIR
