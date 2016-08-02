## Marathon Loader

The Marathon Loader is a Java application that automates the process of deploying Marathon applications. You create a directory structure of
applications and Marathon templates using $ placeholders to allow values to be modified for different environments. Create various Java or
JSON property files to map placeholders to values and then use the loader to send the fully-formed applications to Marathon. The Marathon
Loader can also be used to create environment-specific configuration files that are supplied to the Mesos sandboxes of applications.
