# Smfony-Angular5-Simple-RestApi-Crud
It's a Simple Angular 5 and Symfony 3.3 rest api crud application.
Here Angular 5 is used as front end and Symfony as back end.

#CREATE Angular Project


 a. ng new ngcrud
 b. cd ngcrud
 c. ng serve --open
 
 
#Create Symfony Project 
 
 Follow Documentation
 
Install following Bundles

a. composer require friendsofsymfony/rest-bundle
b. composer require jms/serializer-bundle
c. composer require nelmio/cors-bundle

#Register Bundles in AppKernel.php

  new FOS\RestBundle\FOSRestBundle(),
  new JMS\SerializerBundle\JMSSerializerBundle(),
  new Nelmio\CorsBundle\NelmioCorsBundle(),
  
  
 Configure config.php
 
 nelmio_cors:
    defaults:
        allow_credentials: false
        allow_origin: ['*']
        allow_headers: ['*']
        allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        max_age: 3600
        hosts: []
        origin_regex: false
 
# FOSRest Configuration
fos_rest:
    body_listener: true
    format_listener:
        rules:
            - { path: '^/', priorities: ['json'], fallback_format: json, prefer_extension: false }
    param_fetcher_listener: true
    view:
        view_response_listener: 'force'
        formats:
            json: true
