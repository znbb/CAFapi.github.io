---
layout: default
title: Guidance for CAF Contributors
---

# Implementing Services

The first step is to decide on the endpoint that consumers of the service will use to communicate with the service.

Choose a **queue** endpoint for:-

- Redundancy – Messages are persisted until processed or they are determined to have permanently failed, when they are placed on a dead letter queue, this ensures messages cannot be lost.
- Scalability – A queue provides metrics regarding the performance of the consumers processing messages of the queue, allowing the number of workers to be increased.
- Elasticity – Queues ensure that spikes in workload do not overload the service to a point where no messages can be processed.
- Resiliency – Should a single or all workers fail a queue will continue to record all outstanding requests until service is restored. Allowing other parts of the system to continue to function.
- Asynchronous – When immediate feedback is not required asynchronous communication allows the consumer of the service to continue with other tasks while a request is being processed.

Choose a **network** endpoint for:-

- Low latency – User interfaces need to respond promptly to user actions.
- Large request or response – Network services support streaming of requests and responses for improved efficiency.
- Specialised protocols – ODBC, JDBC and other technology specific protocols.
