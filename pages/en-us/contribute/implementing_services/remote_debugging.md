---
layout: default
title: Guidance for CAF Contributors
---

# Remote Debugging a Worker via IntelliJ

To enable remote debugging of a worker in a container, add a new run configuration to IntelliJ and select the "Remote" option.
Copy the JVM arguments and added them to the JAVA_OPTS env in the marathon file, e.g.

`-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005`

You’ll also need to add the port to the containers port mappings.
Then run the worker as normal, once it’s finished it’s start up run the Remote run configuration in IntelliJ.
