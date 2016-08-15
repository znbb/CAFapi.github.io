The Job service provides an extensible framework for the distributed processing of batch workloads using an elastically scaled pool of workers
built using the worker framework. The Job service’s extensible design allows you to define a batch of work and provide a batch processor plugin
that interprets a batch, splitting it into smaller batches or individual items of work upon which the service can act. The process of batch splitting
is scaled elastically using the autoscaler, allowing sub-batches of a larger batch to be processed in parallel. The individual items of work emerge
and go into the RabbitMQ queue, which is defined in the job and processed by workers. The workers also scale elastically based on the load.