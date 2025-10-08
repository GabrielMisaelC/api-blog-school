@echo off
echo ========================================
echo   TESTE DE INSTALACAO NODE.JS
echo ========================================
echo.

echo Testando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao foi encontrado!
    echo.
    echo Solucoes:
    echo 1. Reinicie o PowerShell/CMD
    echo 2. Reinicie o computador
    echo 3. Reinstale o Node.js manualmente
    goto :end
)

echo.
echo Testando npm...
npm --version
if %errorlevel% neq 0 (
    echo ERRO: npm nao foi encontrado!
    goto :end
)

echo.
echo ========================================
echo   INSTALACAO FUNCIONANDO CORRETAMENTE!
echo ========================================
echo.

echo Navegando para o diretorio do projeto...
cd /d "C:\Users\BruuNo\Downloads\api-blog-school-main"

echo.
echo Instalando dependencias do backend...
npm install

echo.
echo ========================================
echo   INSTALACAO CONCLUIDA!
echo ========================================

:end
pause
