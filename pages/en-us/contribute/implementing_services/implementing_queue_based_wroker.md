---
layout: default
title: Guidance for CAF Contributors
---

# Implementing a queue based worker

A worker is delivered as a set of classes extending the following abstract base classes:-

*   WorkerFactoryProvider
    *   Responsible for the creation of a WorkerFactory. It is supplied a ConfigurationSource, DataStore and Codec which are typically passed on to the WorkerFactory.
    *   `public class ExampleWorkerFactoryProvider implements WorkerFactoryProvider {...`


*   WorkerFactory
    *   Responsible for the creation of Workers. When a new Worker is required it is supplied task data, as a byte array, which the Codec can de-serialize before supplying to the new Worker.
    *   `public class ExampleWorkerFactory extends AbstractWorkerFactory<ExampleWorkerConfiguration, ExampleWorkerTask> {...`


*   Worker
    *   When instructed to doWork it uses the task data supplied by the WorkerFactory and publishes a result serialized using the Codec supplied by the WorkerFactory.
    *   `public class ExampleWorker extends AbstractWorker<ExampleWorkerTask, ExampleWorkerResult> {...`

In addition to the above a Worker implementation should provide definitions and documentation of the task data and task result. For ease of use these definitions should be Java classes that can be serialized to byte arrays using a Codec implementation, however this is optional. In order to allow serialization, the class must contain an empty constructor, with no parameters, and also getters and setters for the variables and properties in the class.

The above, worker specific classes, are then packaged with the following common worker framework modules to form a complete worker.

*   WorkerQueue
    *   Responsible for the retrieval and submission of messages from a queue, a RabbitMQ implementation is provided.
*   ConfigurationSource
    *   Responsible for the retrieval of configuration, File, REST server and Environment implementations are provided.
*   DataStore
    *   A store for task data that is too large for the WorkerQueue implementation. Filesystem and CMX implementations are provided. The maximum size of result allowed on the queue is defined in ExampleWorkerConfiguration as resultSizeThreshold, and by default this is set at a minimum of 1024 bytes and maximum of 102400 bytes.
*   Codec
    *   Responsible for the serialization and de-serialization of task data and task results. YAML and JSON implementations are provided.

Users of the Common Application Framework (CAF) can provide additional implementations of the above modules for specific use cases. Submission of these modules for reuse in other CAF applications is strongly encouraged.

#### Packaging

The assembled jars are packaged as a “.tar.gz” and published to Artifactory this archive of the worker implementation is then referenced from a Dockerfile.

#### Docker

The Dockerfile will reference a suitable base image, likely one with Java 8 installed and then add any further dependencies to the image e.g. the Keyview SDK.

The Dockerfile will contain a command to start the worker application.

CMD ["exec java -cp "\*" com.hpe.caf.worker.core.WorkerApplication server"]

When the Docker image is built it is then pushed to the Artifactory Docker registry.

Documentation of the image is required and should include

*   Supported configuration options
    *   Supplied as environment variables or command line arguments.
    *   Dependencies on other services.
    *   Required volumes and required content if any
    *   Exposed ports

This documentation must be available from the link supplied in the MAINTAINER field of the Dockerfile.

#### Marathon

An example Marathon application definition must be available from the link supplied in the MAINTAINER field.

```json
{    
   "id":"execute-policy-worker",  
   "cpus":0.5,  
   "mem":512,  
   "instances":1,  
   "container":{    
      "type":"DOCKER",  
      "docker":{    
         "image":"policy-engine-worker",  
         "network":"BRIDGE",  
         "portMappings":[    
            {    
               "containerPort":8080,  
               "hostPort":0,  
               "servicePort":9000,  
               "protocol":"tcp"  
            }  
         ]  
      }  
   },  
   "env":{    
      "paas.appname":"myapplication",  
      "worker.queue.input":"execute-policy-input",  
      "worker.queue.output":"execute-policy-output",  
      "worker.backlog":"10"  
   }  
}
```

### Creating a worker

The following modules are required to create a worker. Each contains its own pom.xml with its own dependencies and plugins. 

1.  **Worker-example**
2.  **Worker-example-container**
3.  **Worker-example-shared**

#### Worker-example-shared

The **worker-example-shared** module contains objects shared between the worker and consumers. It forms an interface to the worker.

1.  **ExampleWorkerResult** – the result from the worker. Results are serialized and sent to the RabbitMQ queue specified in the rabbit configuration.
2.  **ExampleWorkerTask** – the main point of entry to communicate with the worker. Tasks are serialized and sent to the worker via the configured queue on RabbitMQ.
3.  **ExampleWorkerStatus** – records the status of the worker result.
4.  **ExampleWorkerConstants** - public constant variables.

#### Worker-example

The **worker-example** module contains the worker itself, closely related classes and an md documentation explaining the service use of the worker.

1.  **ExampleWorker** – responsible for doing the work. AbstractWorker is the preferable base class for a worker in most scenarios, as shown above.
2.  **ExampleWorkerConfiguration** – holds configuration parameters for execution of the worker. These are read in from an ExampleWorkerConfiguration json file and used within the worker execution.
3.  **ExampleWorkerFactory** – creates a worker, extends AbstractWorkerFactory.
4.  **ExampleWorkerFactoryProvider** - creates a worker factory, extends WorkerFactoryProvider.
5.  **ExampleWorkerHealthCheck** - provides a basic health check for marathon GUI display, implements HealthReporter.

Inside worker-example, in the resources folder create a folder "**META-INF**", and inside this create another folder called "**services**". Inside .../META_INF/services create a file called “**com.hpe.caf.api.worker.WorkerFactoryProvider**”. Inside this should be one line “**com.hpe.caf.worker.example.ExampleWorkerFactoryProvider**”. This line points to the package and class name of your worker's factory provider and lets the module loader know how to find the correct WorkerFactoryProvider implementation to load the correct factory provider. (In IntelliJ, make sure the resources folder is marked as "Resources Root").

#### Worker-example-container

The main purpose of **worker-example-container** is to build the docker image for the worker. It has two submodules named **build** and **test**. The **build** module is responsible for building the docker image of the worker and pushing the image to docker. The **test** module is responsible for starting a container for RabbitMQ, test-configs and the worker, and running the integration tests. These tests runs locally and sends task messages to the worker via RabbitMQ. It waits for a response from the worker which will be published by the worker and retrieved from the configured queue. 

1.  **build**
    1.  **pom.xml **- specifying the docker maven plugin and configurations to build the image for the worker
2.  **test**
    1.  **pom.xml **- specifying maven compiler and failsafe plugin for compiling and running integration tests, docker maven plugin to run containers for RabbitMQ, the test-configs and the worker._
    2.  **ExampleResultPreparationProvider** – for creating test items, extends PreparationItemProvider or some subclass of ContentFilesTestItemProvider._
    3.  **ExampleTestControllerProvider** – provides various providers and processors, extends AbstractTestControllerProvider ._
    4.  **ExampleTestExpectation** – test item expected output for comparison with actual output, extends ContentFileTestExpectation._
    5.  **ExampleTestInput** – test item input, extends FileTestInputData._
    6.  **ExampleWorkerResultValidationProcessor** – for validating the expected result and returned worker result are the same/as expected, extends AbstractResultProcessor or one of its subclasses._
    7.  **ExampleWorkerSaveResultProcessor** – for generating test data, extends ContentResultProcessor or a subclass of PreparationResultProcessor._
    8.  **ExampleWorkerTaskFactory** – for creating tasks, extends FileInputWorkerTaskFactory._

#### Integration testing of the worker

In order for docker to successfully run integration tests for the worker, a set of configurations need to be supplied. Inside .../worker-example-container/test, create a folder “**test-configs**” and inside this create the configurations:

1.  **Cfg_test_worker-example_FileSystemDataStoreConfiguration** – configuration for directory of datastore file system.
2.  **Cfg_test_worker-example_ExampleWorkerConfiguration** – configuration for the worker class, the properties in ExampleWorkerConfiguration class.
3.  **Cfg_test_worker-example_RabbitConfiguration** – configuration for rabbit.
4.  **Cfg_test_worker-example_RabbitWorkerQueueConfiguration** – configuration for rabbit’s queues to send and receive messages to and from the worker.
5.  **Cfg_test_worker-example_StorageServiceDataStoreConfiguration** – configuration for the datastore server.

Inside .../worker-example-container/test create **worker.sh** and **worker.yaml**. **Worker.sh** specifies Dropwizard configurations and the command for the WorkerApplication to be executed. **Worker.yaml** specifies Dropwizard configurations for logging.

The integration test verifies that the worker completes with the desired results before being deployed. Tests are supplied via a test case file which is deserialised by a YAML codec and creates test item objects. Create a folder "test-data" in the .../worker-example-container/test and inside this create a folder "**input**". Inside this create your test data i.e. "**test1.txt**", "**test2.txt**". You need a testcase in order to run the tests on your container. You can manually create these (they are yaml serialised test item objects) or you can run the test-app with -g to generate the test data. (In IntelliJ make sure "test-data" is marked as "Test Resources Root").

#### Using Marathon loader

Using the marathon loader jar you can run the worker on marathon using a set of configuration files which are found in the configuration folder.

1.  **marathon-properties.json** - defines a set of properties which will be used in the config templates.
2.  **marathon-example-worker.json** - defines the rest request to start the worker from the image which is already existing on the virtual machine. Uses properties defined in marathon-properties.json.
3.  **cfg_${marathon-group}-example_ExampleWorkerConfiguration** - configuration template for ExampleWorkerConfiguration class. Uses properties defined in marathon-properties.json.
4.  **cfg_${marathon-group}-example_FileSystemDataStoreConfiguration** - configuration template specifying datastore location.
5.  **cfg_${marathon-group}-example_RabbitWorkerQueueConfiguration** - configuration template specifying Rabbit worker and Rabbit worker queue configurations. Uses properties defined in marathon-properties.json.
6.  **cfg_${marathon-group}-example_StorageServiceDataStoreConfiguration** - configuration template specifying data storage server configurations. Uses properties defined in marathon-properties.json.

The marathon loader can be run by calling the jar with the following command:

<pre>java -jar marathon-loader-2.1-SNAPSHOT-jar-with-dependencies.jar -m "/c/Workspace/worker-example-container/configuration/marathon-template-json" -c "/c/Workspace/worker-example-container/configuration/marathon-template-config" -v "/c/Workspace/worker-example-container/configuration/marathon-properties.json" -e [http://localhost:8080](http://localhost:8080) -mo "/c/Workspace/worker-example-container/configuration/marathon-config" -co "/c/Workspace/worker-example-container/configuration/marathon-config"</pre>

*   -c VAL : Specify directory of config files or a config file

*   -cf VAL : A glob filter for the config files when a directory is supplied for -c

*   -co VAL : Output directory for config files

*   -e VAL : Marathon host, if not supplied applications will not be loaded

*   -g : Enables apps to be deployed as a group with dependencies

*   -m VAL : Specify directory of Marathon files or a Marathon file

*   -md : Destroy Marathon app before putting

*   -mf VAL : A glob filter for the Marathon files when a directory is supplied for -m

*   -mo VAL : Output directory for Marathon files

*   -v VAL : Specify property file

For more information on apps using marathon visit [l. Configuration for Marathon Applications](/confluence/display/CAF/l.+Configuration+for+Marathon+Applications).

#### Running the test app

Your worker must be registered with the test app. Create a "**META-INF**" folder in .../worker-example-container/test/src/main/resources and inside this create a folder named "**services**". Inside this create a file called "**com.hpe.caf.worker.testing.execution.TestControllerProvider**" and inside this file write one line "**com.hpe.caf.worker.example.ExampleTestControllerProvider**". This registers the test controller for the worker with the test app. (In IntelliJ make sure the resources folder is marked as "Resources Root").

Your worker and RabbitMQ must be running on marathon already. You can run the test app jar file with the following command:

<pre>java -Dcaf.appname="test/worker-example" -Dconfig.path="C:\Workspace\worker-example-container\test-configs" -Dinput.folder="C:\Workspace\worker-example-container\test-data\input" -Dexpected.folder="C:\Workspace\worker-example-container\test-data\input" -Ddocker.host.address="127.0.0.1" -Drabbitmq.node.port="5672" -Ddatastore.container.id="0a1b8e24cc44490888b3d8d8ebba8309" -Ddatastore.enabled="true" -Dworker.adminport="8081" -Dcaf.worker-store.impl="worker-store-cs" -Dworker-example.container.name="caf/[worker-example:1.0-SNAPSHOT](http://worker-example:1.0-SNAPSHOT)" -jar worker-tester.jar -w ExampleWorker -g</pre>

*   **-Dconfig.path** points to the folder with your test configs.
*   **-Dinput.folder** points to the folder with your test input data.
*   **-Dexpected.folder** points to the folder with your test result.content data (generated with -g).
*   **-Dworker example.container.name** is the name of the image built on docker.

This will run the worker with your test input data and automatically generate test cases and result content files. You can then run the command again without the -g to run the tests.
