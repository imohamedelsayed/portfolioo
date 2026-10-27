$chromeProc = Start-Process -FilePath "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--headless=new", "--remote-debugging-port=9222", "--no-sandbox", "http://localhost:3000/" -PassThru
Start-Sleep -Seconds 3
node scripts/cdp-inspect.cjs
Stop-Process -Id $chromeProc.Id -Force
