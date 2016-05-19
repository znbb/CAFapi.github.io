---
layout: default
title: Guidance for CAF Contributors
---

# Guidance for CAF Contributors

### Introduction

This page provides guidance on how to provide services for consumption within CAF, it describes the different types of service and the requirements placed upon them.

Please refer to **PaaS Technology Choice** for background information on the technologies chosen.

### What is a service?

A service is a piece of software that performs a function useful to applications deployed in PaaS. It may provide a network endpoint to receive requests or retrieve work from a store, such as a queue, and place the results in the same or another store.

A service should be viewed as a Mesos task deployed within a Mesos cluster, it may have dependencies on other services.

### Types of Service

#### Stateless Service

Services with no internal state are typically data processing services and can be horizontally scaled merely by creating more instances of the service. Services which depend on other services for state can be considered stateless and scale horizontally providing the underlying stateful service scales to meet demand.

#### Stateful Service

Stateful services such as relation data stores are challenging to scale horizontally due to the potentially unlimited amount of data they must store and retrieve. For this reason a number of concessions are made.

**Concessions**

- Vertical scaling is acceptable.
- Multiple instances of a stateful service can be deployed with routing provided by the consuming application. (Routing could be based on tenant or other application specified rules)
- Scaling of a stateful service may require manual intervention.
- Services can be deployed and managed externally from Mesos. Future iterations of CAF will introduce support for the most commonly used database software.

#### Composite Service

A composite service is dependent on other services, these services may be private to the composite service or shared with other services.

Private services are the responsibility of the composite service to deploy, these should be encapsulated to ensure they do not conflict with other instances of the service deployed by other components.

Shared services are the responsibility of the platform owner to deploy before the composite service is deployed. The deployment of the composite service accepts configuration to connect to the shared service.

#### External Dependencies

Services should avoid dependencies on software installed directly on a Mesos slave. Such software is not managed by the Mesos infrastructure and therefore cannot avail of the resiliency features of Mesos and will require manual configuration and ongoing maintenance.
