@setlocal enableextensions
@cd /d "%~dp0"

REM Same JVM flags as ProjectZomboid64.json (read by ProjectZomboid64.exe / Steam),
REM so this launcher and the normal one behave the same: ZombieBuddy and PZ
REM Optimization both load, and the heap is 4 GB initial / 10 GB maximum.
SET _JAVA_OPTIONS=-agentlib:zbNative
SET PZ_CLASSPATH=./;PZOptimEngine.jar;ZombieBuddy.jar;projectzomboid.jar
SET PZ_ARGS=-Djava.awt.headless=true --enable-native-access=ALL-UNNAMED --add-exports=java.base/jdk.internal.misc=ALL-UNNAMED -Dzomboid.steam=1 -Dzomboid.znetlog=1 -Djava.library.path=./win64/;./ -agentlib:pzo_native64 -XX:-CreateCoredumpOnCrash -XX:-OmitStackTraceInFastThrow -XX:+PerfDisableSharedMem -XX:+UnlockExperimentalVMOptions -XX:+UseSuperWord -XX:MaxInlineLevel=15 -XX:InlineSmallCode=2500 -XX:+UseNUMA -Xms8192m -Xmx8192m -XX:+UseZGC -cp %PZ_CLASSPATH%

".\jre64\bin\java.exe" %PZ_ARGS% com.pzoptimizer.PZOEntrypoint %1 %2

IF %ERRORLEVEL% NEQ 0 (
 echo.
 echo [PZ Optimization entrypoint failed - trying the vanilla main class]
 echo.
 ".\jre64\bin\java.exe" %PZ_ARGS% zombie.gameStates.MainScreenState %1 %2
)

PAUSE
