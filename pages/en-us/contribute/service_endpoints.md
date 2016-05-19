---
layout: default
title: Guidance for CAF Contributors
---

# Service Endpoints

### Network

A network service is free to expose network endpoints, using the most appropriate protocol for the service. The endpoint must be secured using either PaaS authentication or the services own authentication mechanism. Integration with PaaS authentication is preferred but it is accepted this is not always practical when integrating existing software with PaaS.

#### Service Discovery

In order for a service to be consumed it must be discoverable. With Mesos the recommended approach is to leverage Mesos-DNS.

*Mesos-DNS supports service discovery in Apache Mesos clusters. It allows applications and services running on Mesos to find each other through the domain name system (DNS), similar to how services discover each other throughout the Internet.*

[https://github.com/mesosphere/mesos-dns](https://github.com/mesosphere/mesos-dns)

### Queue – Using Asynchronous Worker Framework

PaaS provides an Asynchronous Worker Framework using message queues to distribute work to services. This framework aids with the development of queue workers using the PaaS queue service.

[GitHub Enterprise](https://github.hpe.com/caf) maintains the source code and associated technical documentation.

Users of a queue based service define the request and response queue for each instance of a service. Applications can chose to deploy multiple instances of a service, with different request and response queues, in order to provide different service tiers. For example a low, medium and high priority service instance or a service instance for certain tenants.

Characteristics of a worker are:-

- A worker receives jobs from a single queue
- A worker puts results onto a single, different queue
- Each worker will handle one type of work
- Each worker may handle multiple tasks at once
- The input and output queues are set at start-up time
- The workers are stateless, and so can be trivially scaled
- A worker will not lose requests, and gracefully handle failure
- A worker will provide metrics and health checks
- Results are wrapped in a fixed container
- A worker will not accept any new work if a shutdown is triggered
- A worker will attempt to finish current work if a shutdown is triggered
