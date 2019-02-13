FROM php:7.2.10-fpm-alpine3.8

USER root

RUN \
    apk add --update \
    autoconf \
    curl \
    g++ \
    libxml2-dev libpng-dev libjpeg-turbo-dev \
    make \
    nghttp2 nginx nginx-mod-http-upload-progress \
    postgresql-dev \
    git \
    supervisor \
    sudo \
    icu icu-dev \
    bash \
    && pecl install xdebug-2.6.0 \
    && docker-php-ext-enable xdebug \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && docker-php-ext-install pdo_pgsql intl zip json

COPY config/php.ini /usr/local/etc/php.ini
COPY config/php-fpm.d/zz-docker.conf /usr/local/etc/php-fpm.d/
COPY config/docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d/
COPY config/nginx/nginx.conf /etc/nginx/
COPY config/nginx/nginx.laravel.conf /etc/nginx/conf.d/default.conf
COPY config/supervisor/supervisor.conf /etc/supervisor/conf.d/
COPY config/supervisor/php-fpm.conf /etc/supervisor/
COPY config/supervisor/nginx.conf /etc/supervisor/

RUN touch /var/run/php-fpm.sock && chown www-data:nginx /var/run/php-fpm.sock

WORKDIR /var/www

ENTRYPOINT [ "/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/nginx.conf" ]
