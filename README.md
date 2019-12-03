# Docker Driven Development Example

See [slides](http://softpixel.com/~mradcliffe/#!/articles/2018/10/docker-driven-development) for details.

This is an example of configuring your own docker development environment from scratch.

> The code base here should **not** be used in production and may contain security vulnerabilities. Much of the laravel application is meant to bypass authentication and allow anonymous authorization to services for the purposes of the presentation.

## Minimum Requirements

* Docker 18.06ce running
   * Windows 10+: Docker for Windows
   * MacOS Sierra: Docker for Mac
   * Linux: docker, docker-compose from your distro. or binaries compiled yourself.

## Getting Started

1. Open a terminal window such as Terminal.app or Git-Bash.
   * Note: Linux users may need a python environment setup with docker-compose.
2. Clone repository: `git clone https://github.com/mradcliffe/docker-driven-development.git`
3. Change directory into this repository: `cd docker-driven-development`
4. Install front-end dependencies: `npm install`
5. Install back-end dependencies: `mkdir database/{seeds,factories} && mkdir -p storage/framework/{sessions,views,cache} && composer install`
6. Start: `docker-compose up -d`.
7. Run: `docker exec docker-driven-development_web_1 ./artisan migrate:refresh`
8. Run: `npm start`

## Stopping / Destroying

* Run `docker-compose stop` to stop containers.
* Run `docker-compose down` to destroy all containers, but keep any volumes.
* Run `docker-compose down --volume` to destroy all containers and volumes.

