## Storage Service

The Storage service allows for the secure upload and download of assets in a multi-tenant environment. The Storage service provides a REST
API for storing, retrieving, and browsing of assets. It is capable of scaling to petabytes of data, and offers block level single instance storage
(deduplication) on a per-tenant basis. Upload and download APIs provide advanced capabilities such as the ability to resume, send/retrieve
blocks in any order, as well as send/retrieve blocks in parallel per asset. The service provides WORM capabilities on a per asset basis, allowing
you to define a period of time for which the asset cannot be modified and is guaranteed to be returned exactly as it was uploaded. The Storage
service utilizes the Identity Management service for authentication, as well as authorization to so that only users with appropriate roles &
permissions can access stored assets. The Storage service also utilizes the Auditing service, providing a record of user actions at the API level.