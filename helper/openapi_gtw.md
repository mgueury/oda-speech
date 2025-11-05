                SUPPORTED_OCIGENAI_CHAT_MODELS[model.display_name] = {
                    "model_id":model.display_name,
                    "region": OCI_REGION,
                    "compartment_id": OCI_COMPARTMENT,
                    "type": "ondemand",
                    "provider": model.display_name.split(".")[0] if "." in model.display_name else "UNKNOWN",
                }

curl http://localhost:8080/v1/models -H "Content-Type: application/json" -H "Authorization: Bearer ocigenerativeai"

./starter.sh ssh compute
export OPENAI_API_KEY="ocigenerativeai"
curl http://localhost:8080/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "cohere.command-latest",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "What is the capital of France?"
      }
    ]
  }' | jq .

export OPENAI_API_KEY="ocigenerativeai"
curl http://localhost:8080/v1/models -H 'Content-Type: application/json' -H "Authorization: Bearer $OPENAI_API_KEY" | jq .