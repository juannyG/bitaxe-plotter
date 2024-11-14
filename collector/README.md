* golang 1.22.2
* Miner types supported
  * [AxeOS - Skot's ESP-Miner](https://github.com/skot/ESP-Miner?tab=readme-ov-file#axeos-api)
  * [Kano's cgminer 4.13.1](https://github.com/kanoi/cgminer)

Supported metric stores
* [InfluxDB2](https://docs.influxdata.com/influxdb/v2/install/?t=Docker)

Visualizations
* [Grafana](https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/#use-bind-mounts)

Usage
* Coming soon

Configuration
* Coming soon

# Quickstart

## Start up the data store

A sample `docker-compose.yaml` file has been provided that loads up
* InfluxDB2 - accessible via http://localhost:8086 - this is where the collector sends metrics
* Grafana - accessible via http://localhost:3000 - this is a tool for visualizing metrics

To get them running, run the following command
```sh
docker compose up -d
```

##### WARNING: The credentials in `docker-compose.yaml` are STRICTLY for local use ONLY.

## Configure Grafana access to InfluxDB2

* Login to your local InfluxDB2 instance - http://localhost:8086
* Create an [InfluxDB2 token](https://docs.influxdata.com/influxdb/v2/admin/tokens/create-token/) for grafana
  * Keep the generated token on hand as it'll be gone once you navigate away. You can always trash and create a new one in this UI
* Log in to your local Grafana instance - http://localhost:3000 - admin/admin and change your password as you see fit
* Click on "Add your first data source"
* Click on "InfluxDB"
* Configure the following options
  * Query Language: `Flux`
  * HTTP - URL: `http://influxdb2:8086`
  * Deselect any options already selected in the Auth section
  * Organization: `collector`
  * Token: Past the InfluxDB2 token generated earlier
  * Bucket: `miners`

[Useful reference when using docker compose with these tools](https://community.grafana.com/t/connection-refused-error-reading-buckets/71749/18)

## Configuring the collector

Coming soon...

### InfluxDB2

Create an [InfluxDB2 token](https://docs.influxdata.com/influxdb/v2/admin/tokens/create-token/) for the collector

### Sample file

```json
{
  "miners": [
    {
      "name": "gekkosci.r909[0]",
      "type": "cgminer",
      "host": "10.0.0.216:4028",
      "store": "localInflux"
    }
  ],
  "stores": {
    "localInflux": {
      "host": "http://localhost:8086",
      "token": "token-generated-"
      "org": "collector",
      "bucket": "miners",
      "type": "influxdb2"
    }
  }
}

```

## Start the collector


Coming soon...

## Development

Adding new metric store
* Coming soon

Adding a new miner type
* Coming soon
