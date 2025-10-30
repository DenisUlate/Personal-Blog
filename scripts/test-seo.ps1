# 🧪 Script de Prueba de SEO

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Probando Endpoints de SEO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"

# Función para probar un endpoint
function Test-Endpoint {
    param(
        [string]$url,
        [string]$name
    )
    
    Write-Host "Probando: $name" -ForegroundColor Yellow
    Write-Host "URL: $url" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method Get -UseBasicParsing
        
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ OK - Status: $($response.StatusCode)" -ForegroundColor Green
            Write-Host "   Content-Type: $($response.Headers['Content-Type'])" -ForegroundColor Gray
            Write-Host "   Content-Length: $($response.RawContentLength) bytes" -ForegroundColor Gray
        } else {
            Write-Host "⚠️  WARNING - Status: $($response.StatusCode)" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "❌ ERROR - No se pudo acceder al endpoint" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "Asegúrate de que el servidor esté corriendo con: npm run dev" -ForegroundColor Cyan
Write-Host ""
Start-Sleep -Seconds 2

# Probar robots.txt
Test-Endpoint -url "$baseUrl/robots.txt" -name "robots.txt"

# Probar sitemap.xml
Test-Endpoint -url "$baseUrl/sitemap.xml" -name "sitemap.xml"

# Probar feed.xml
Test-Endpoint -url "$baseUrl/feed.xml" -name "RSS Feed (feed.xml)"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Pruebas Completadas" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Abre estos URLs en tu navegador para ver el contenido:" -ForegroundColor Yellow
Write-Host "   - $baseUrl/robots.txt" -ForegroundColor Cyan
Write-Host "   - $baseUrl/sitemap.xml" -ForegroundColor Cyan
Write-Host "   - $baseUrl/feed.xml" -ForegroundColor Cyan
Write-Host ""
