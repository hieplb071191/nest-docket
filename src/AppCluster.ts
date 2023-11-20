import * as _cluster from 'cluster';
import * as os from 'os';
const cluster = _cluster as unknown as _cluster.Cluster;
import { Injectable } from '@nestjs/common';

const numCPUs = os.cpus().length;

@Injectable()
export class AppClusterService {
    static clusterize(callback: Function): void {
        if(cluster.isPrimary){
            console.log(`Master server started on ${process.pid}`);
            for (let i = 0; i < numCPUs; i++) {
                if (i === 2 || i === 3) {

                    cluster.fork();
                }
            }
            cluster.on('exit', (worker, code, signal) => {
                console.log(`Worker ${worker.process.pid} died. Restarting`);
                cluster.fork();
            })
        } else {
            console.log(`Cluster server started on ${process.pid}`)
            callback();
        }
    }
}
