@echo off
if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
pushd "%CD%"
CD /D "%~dp0"
set curdir=%~dp0
cd /d %curdir%
title RtspWebSocket
node websocket.js supersecret 8081 8082
