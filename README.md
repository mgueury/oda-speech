## ODA Speech - getToken component
### Usage
Install a OCI Compute with a NodeJS program. The program is accessible HTTP and HTTPS (via APIGateway):
- http://COMPUTE_IP/app/getToken
- https://APIGW_HOSTNAME/xxxxx/app/getToken

For more information, see here:
- https://docs.oracle.com/en/cloud/paas/digital-assistant/sdk-js/index.html

### Commands
- starter.sh         : Show the menu
- starter.sh help    : Show the list of commands
- starter.sh build   : Build the whole program: Run Terraform, Configure the DB, Build the App, Build the UI
- starter.sh destroy : Destroy the objects created by Terraform
- starter.sh env     : Set the env variables in BASH Shell

### Next Steps:

- Build:
  ./starter.sh build

