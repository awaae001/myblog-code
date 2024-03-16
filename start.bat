@echo off
echo Current directory: %cd%
hexo clean
echo Hexo clean command executed.
hexo g
echo Hexo generate command executed.
hexo s
echo Hexo server command executed.
pause
