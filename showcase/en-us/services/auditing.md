The Audit service allows you to audit user and system actions by defining the required events and the information associated with each event.
This definition is registered with the Audit service and used to create a Java SDK to record the audited events. The Audit service is multi-tenant
aware, which requires an application producing events to register each new tenant. Applications send events using the generated Java SDK to
Kafka from which the Kafka Vertica Integration loads the audit event messages into a table for the tenant of the application producing
messages.