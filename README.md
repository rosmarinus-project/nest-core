# @rosmarinus/nest-core

<a href="https://github.com/rosmarinus-project/nest-core/actions/workflows/publish.yml"><img src="https://github.com/rosmarinus-project/nest-core/actions/workflows/publish.yml/badge.svg" alt="build status"></a> <a href="https://pr.new/rosmarinus-project/nest-core"><img src="https://developer.stackblitz.com/img/start_pr_dark_small.svg" alt="Start new PR in StackBlitz Codeflow"></a>

This npm package contains some function encapsulation commonly used in development, which is more engineering-oriented.

# How to Install

```bash
npm i @rosmarinus/nest-core
```

# Modules introduction

1. Context

Context 装饰器，会自动封装每个接口的上下文，比方说会封装用于该接口的 logger

2. AllExceptionsFilter

This module will capture global errors and return uniform results

3. HeadersMiddleware

This module will add Fcgi-Srtime and Request-Id to the headers of all returned results.

4. RedisService and RedisModule

This module encapsulates ioredis into a nest module