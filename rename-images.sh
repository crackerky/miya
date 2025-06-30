#!/bin/bash

# 画像ファイル名を英語に変更するスクリプト

echo "==================================="
echo "画像ファイル名の変更"
echo "==================================="
echo ""
echo "以下のように画像ファイル名を変更してください："
echo ""
echo "1. 255ha王国.png → kingdom-255ha.png"
echo "2. 昆虫たくさん.png → insects-collection.png"
echo "3. 遺跡.png → ruins.png"
echo ""
echo "変更後、コード内の参照も更新する必要があります。"
echo ""
echo "==================================="

# Windowsの場合
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    cd public
    if [ -f "255ha王国.png" ]; then
        mv "255ha王国.png" "kingdom-255ha.png"
        echo "✓ 255ha王国.png → kingdom-255ha.png"
    fi
    if [ -f "昆虫たくさん.png" ]; then
        mv "昆虫たくさん.png" "insects-collection.png"
        echo "✓ 昆虫たくさん.png → insects-collection.png"
    fi
    if [ -f "遺跡.png" ]; then
        mv "遺跡.png" "ruins.png"
        echo "✓ 遺跡.png → ruins.png"
    fi
    cd ..
fi

echo ""
echo "完了しました。"
