# =====================================================
# 一键打包部署脚本
# 流程：pnpm docs:build 打包到 dist
#      -> dist 上传到 master 分支（站点托管分支）
#      -> 源码上传到 vptp2 分支
# 用法：.\deploy.ps1   （或 pnpm deploy）
# 说明：commit 信息由执行者自行输入
# =====================================================
$ErrorActionPreference = "Stop"

# ---------- 1. 打包到 dist ----------
Write-Host "`n[1/3] 开始打包 (pnpm docs:build) ..." -ForegroundColor Cyan
pnpm docs:build
if ($LASTEXITCODE -ne 0) {
    Write-Host "打包失败，部署中止" -ForegroundColor Red
    exit 1
}

# ---------- 2. dist 上传到 master 分支 ----------
Write-Host "`n[2/3] 将 dist 发布到 master 分支 ..." -ForegroundColor Cyan
git fetch origin master

$deployDir = Join-Path $env:TEMP "vuepress-master-deploy"
# 清理上次残留的临时工作树
git worktree prune
if (Test-Path $deployDir) { Remove-Item -Recurse -Force $deployDir }

# 用 worktree 把 origin/master 检出到临时目录，避免切换当前分支
git worktree add $deployDir origin/master

# 同步 dist 内容到工作树（/MIR 镜像：多删少补），排除 .git
robocopy dist $deployDir /MIR /XD .git /NFL /NDL /NJH /NJS
if ($LASTEXITCODE -ge 8) {
    Write-Host "dist 同步失败，部署中止" -ForegroundColor Red
    exit 1
}

Push-Location $deployDir
git add -A
$masterMsg = Read-Host "请输入 [dist -> master] 的 commit 信息"
git commit -m "$masterMsg"
if ($LASTEXITCODE -ne 0) {
    Write-Host "master 无变更需要提交，跳过推送" -ForegroundColor Yellow
} else {
    git push origin HEAD:master
    if ($LASTEXITCODE -ne 0) {
        Write-Host "master 推送失败，部署中止" -ForegroundColor Red
        Pop-Location
        exit 1
    }
}
Pop-Location
git worktree remove --force $deployDir

# ---------- 3. 源码上传到 vptp2 分支 ----------
Write-Host "`n[3/3] 将源码推送到 vptp2 分支 ..." -ForegroundColor Cyan
git add -A
$vptp2Msg = Read-Host "请输入 [源码 -> vptp2] 的 commit 信息"
git commit -m "$vptp2Msg"
if ($LASTEXITCODE -ne 0) {
    Write-Host "vptp2 无变更需要提交，跳过推送" -ForegroundColor Yellow
} else {
    git push origin vptp2
    if ($LASTEXITCODE -ne 0) {
        Write-Host "vptp2 推送失败" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n部署完成！站点地址：https://chenzk14.github.io/vuepress/" -ForegroundColor Green
