@echo off
echo Starting restore... > restore_bat.log
node restore_products.js >> restore_bat.log 2>&1
echo Done. >> restore_bat.log
