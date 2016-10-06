angular.module('cafapi.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('showcase/en-us/introduction.md',
    "# Accelerate your time to value\r" +
    "\n" +
    "\r" +
    "\n" +
    "The HPE Common Application Framework is a collection of microservices essential for any developer of big data applications. \r" +
    "\n" +
    "We are the recognized leaders in delivering big data enterprise applications and we designed these services to form the core of our next generation archiving, \r" +
    "\n" +
    "back-up, content management, and analytics products.\r" +
    "\n" +
    "\r" +
    "\n" +
    "We're committed to open-sourcing all of these services to more rapidly fuel innovation in the community as well as to provide standards \r" +
    "\n" +
    "with regards to the management of unstructured information at scale.\r" +
    "\n" +
    "\r" +
    "\n" +
    "---\r" +
    "\n" +
    "\r" +
    "\n" +
    "![Overview](assets/img/microservices-graphic.png)\r" +
    "\n" +
    "\r" +
    "\n" +
    "Each microservice is wrapped in a Docker container for light-weight portability and rapid development. \r" +
    "\n" +
    "They can be deployed stand-alone or with fault-tolerant queues running on Apache Mesos with Marathon for massive scalability \r" +
    "\n" +
    "and high availability. These services are designed for SaaS deployment and are fully multi-tenant aware."
  );


  $templateCache.put('showcase/en-us/services/analytics.md',
    "The Analytics service provides a REST API to query and retrieve information from structured and un-structured data sources. You can perform\r" +
    "\n" +
    "full-text and field-based queries to retrieve data stored as documents in an unstructured database. The API provides a simple query language,\r" +
    "\n" +
    "which is loosely based on the contextual query language specification. In addition to simple queries, the API provides a way to write SQL\r" +
    "\n" +
    "templates, which allow you to perform analytical operations such as aggregations, averages, time series analysis, log analysis, trend detection\r" +
    "\n" +
    "and so on. You can also apply full-text query filters on analytical queries"
  );


  $templateCache.put('showcase/en-us/services/auditing.md',
    "The Audit service allows you to audit user and system actions by defining the required events and the information associated with each event.\r" +
    "\n" +
    "This definition is registered with the Audit service and used to create a Java SDK to record the audited events. The Audit service is multi-tenant\r" +
    "\n" +
    "aware, which requires an application producing events to register each new tenant. Applications send events using the generated Java SDK to\r" +
    "\n" +
    "Kafka from which the Kafka Vertica Integration loads the audit event messages into a table for the tenant of the application producing\r" +
    "\n" +
    "messages."
  );


  $templateCache.put('showcase/en-us/services/auto_scaler.md',
    "The Autoscaler service provides on-demand scaling of services, allowing you to efficiently dedicate resources where they are needed most in\r" +
    "\n" +
    "your Mesos cluster, and minimizing costs and ensuring user satisfaction. The Autoscaler is an extensible framework, which allows you to provide\r" +
    "\n" +
    "your own modules to retrieve services to scale, metrics to make scaling decisions and instigate a scaling action. The Autoscaler service provides\r" +
    "\n" +
    "a source for Marathon that identifies services to scale using Marathon labels. A RabbitMQ workload analyzer retrieves details of RabbitMQ\r" +
    "\n" +
    "queues to make scaling decisions. A Marathon application scaler issues commands to the Marathon REST API to scale up and down a service."
  );


  $templateCache.put('showcase/en-us/services/data_processing.md',
    "The Data Processing service provides advanced processing functions to allow machines to interrogate and analyze a wide range of file formats.\r" +
    "\n" +
    "With such a wide range of data sources, including email, voice and image, data analytics can be a challenging problem. The Data Processing\r" +
    "\n" +
    "service allows you to create bespoke data processing pipelines, which perform any of the following data processing actions based on the file\r" +
    "\n" +
    "type and metadata.\r" +
    "\n"
  );


  $templateCache.put('showcase/en-us/services/elements.md',
    "Elements is the only open source user interface framework for building modern, responsive, mobile big data applications on the web. \r" +
    "\n" +
    "\r" +
    "\n" +
    "Elements provides all of the essentials required for your big data project, allowing you to swiftly create dashboards and reports that provide users with the\r" +
    "\n" +
    "insights they crave from their big data applications. Elements is based on best-of-breed, open source technologies, including AngularJS,\r" +
    "\n" +
    "Bootstrap and D3. It is easy to include in your web applications with the Bower web package manager.\r" +
    "\n"
  );


  $templateCache.put('showcase/en-us/services/identity_management.md',
    "The Identity Management service provides authentication and authorization of end users as well as other, related micro-services. The Identity\r" +
    "\n" +
    "Management service implements authentication and authorization of end users as well as other, related micro-services. Authentication uses the\r" +
    "\n" +
    "industry standard OAUTH 2.0 protocol with encrypted tokens of varying life spans. For user management, Identity Management supports\r" +
    "\n" +
    "enterprise hierarchy and AD/LDAP for customer hierarchy. Any number of applications can register their roles and permissions with the service.\r" +
    "\n" +
    "Application administrators can assign application-specific roles and permissions to users. Leveraging this service relieves you of having to create\r" +
    "\n" +
    "these core building blocks of any SaaS application on your own.\r" +
    "\n"
  );


  $templateCache.put('showcase/en-us/services/imaging.md',
    "The Imaging service provides the ability to convert between HTML and searchable PDF, as well as between PDF and JPEG, PNG, TIFF and other common image formats. In addition to format conversion, the Imaging service supports document mark-up with redactions and endorsements. Redactions can permanently remove sensitive content from documents while endorsements can add text annotations to documents.\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('showcase/en-us/services/job_service.md',
    "The Job service provides an extensible framework for the distributed processing of batch workloads using an elastically scaled pool of workers\r" +
    "\n" +
    "built using the worker framework. The Job service’s extensible design allows you to define a batch of work and provide a batch processor plugin\r" +
    "\n" +
    "that interprets a batch, splitting it into smaller batches or individual items of work upon which the service can act. The process of batch splitting\r" +
    "\n" +
    "is scaled elastically using the autoscaler, allowing sub-batches of a larger batch to be processed in parallel. The individual items of work emerge\r" +
    "\n" +
    "and go into the RabbitMQ queue, which is defined in the job and processed by workers. The workers also scale elastically based on the load."
  );


  $templateCache.put('showcase/en-us/services/marathon_loader.md',
    "The Marathon Loader is a Java application that automates the process of deploying Marathon applications. You create a directory structure of\r" +
    "\n" +
    "applications and Marathon templates using $ placeholders to allow values to be modified for different environments. Create various Java or\r" +
    "\n" +
    "JSON property files to map placeholders to values and then use the loader to send the fully-formed applications to Marathon. The Marathon\r" +
    "\n" +
    "Loader can also be used to create environment-specific configuration files that are supplied to the Mesos sandboxes of applications.\r" +
    "\n"
  );


  $templateCache.put('showcase/en-us/services/storage.md',
    "The Storage service allows for the secure upload and download of assets in a multi-tenant environment. It provides a REST API for the storing, retrieving, and browsing of assets. The Storage service scales to petabytes of data, and offers block-level, single-instance storage\r" +
    "\n" +
    "(deduplication) on a per-tenant basis. \r" +
    "\n" +
    "\r" +
    "\n" +
    "Upload and download APIs provide advanced capabilities, such as the ability to resume, and send/retrieve\r" +
    "\n" +
    "blocks in any order, as well as send/retrieve blocks in parallel per asset. The service provides WORM capabilities on a per-asset basis, allowing\r" +
    "\n" +
    "you to define a period of time for which the asset cannot be modified and is guaranteed to be returned exactly as it was uploaded. \r" +
    "\n" +
    "\r" +
    "\n" +
    "The Storage service utilizes the Identity Management service for authentication, as well as authorization, so that only users with appropriate roles and\r" +
    "\n" +
    "permissions can access stored assets. The Storage service also utilizes the Auditing service, providing a record of user actions at the API level.\r" +
    "\n"
  );


  $templateCache.put('showcase/en-us/services/worker_framework.md',
    "The Worker Framework is a set of building blocks for asynchronous, distributed, data-processing microservices known as workers. This\r" +
    "\n" +
    "framework is designed for high scalability and fault tolerance, and is easily extensible. The Worker Framework provides a foundation for cross platform,\r" +
    "\n" +
    "cloud-ready, distributed data-processing microservices (workers). The framework is designed for massive scalability, redundancy,\r" +
    "\n" +
    "elasticity and resilience, which are achieved through architectural choices and technologies like Docker, Apache Mesos, Marathon and queue based\r" +
    "\n" +
    "messaging with RabbitMQ. You can extend this framework through integration with many external and internal components, such as\r" +
    "\n" +
    "storage services. The Worker Framework is a good fit for any data-processing scenario, including both on-premise and cloud-based solutions\r" +
    "\n" +
    "delivered as SaaS. For example, the Worker Framework could benefit solutions for content processing, mathematical and statistical analysis, and\r" +
    "\n" +
    "image and audio processing. The Worker Framework is written entirely in Java and features the necessary infrastructure for execution of\r" +
    "\n" +
    "workers, messaging with fault-tolerant queues, monitoring, scaling, error handling and external data exchange. It also includes a set of base\r" +
    "\n" +
    "classes and interfaces allowing rapid development and integration.\r" +
    "\n"
  );

}]);
