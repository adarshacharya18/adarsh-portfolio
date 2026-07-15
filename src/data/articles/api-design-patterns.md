# REST and gRPC Design Patterns for High Throughput Apps

Choosing the right protocol boundary dictates the operational cost and performance of microservice architectures. While REST is standard for public endpoints, internal node-to-node communication runs more efficiently over **gRPC** utilizing Protocol Buffers.

## 1. Schema Validation and Protocol Buffers
gRPC uses binary serialization, eliminating JSON parsing overhead. The service definition acts as the contract:

```protobuf
syntax = "proto3";

package telemetry;

service MetricsService {
  rpc ReportCommit (CommitRequest) returns (CommitResponse);
}

message CommitRequest {
  string repo_url = 1;
  string commit_sha = 2;
  int64 timestamp = 3;
}

message CommitResponse {
  bool accepted = 1;
  string request_id = 2;
}
```

## 2. Token Bucket Rate Limiting
To protect backend worker threads, implement a Token Bucket algorithm inside middleware using Redis:
1. Every IP has a bucket key holding token balances.
2. Incoming requests call `EVALSHA` scripts to atomic-check and decrement the balance.
3. If balance is empty, return a `429 Too Many Requests` response.
