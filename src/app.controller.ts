import { Controller, Get } from '@nestjs/common';
const requestCounter = new Map<number, number>();
let globalRequestCount = 0;
let lastUpdated = Date.now();

@Controller()
export class AppController {

  @Get('/hello-cpu')
   getHello(): string {
    const val =  this.fibonacciRecursive(25)
    return "hello"+val;
  }
   fibonacciRecursive(n) {
    if (n <= 1) return n;
    return  this.fibonacciRecursive(n - 1) +  this.fibonacciRecursive(n - 2);
  }
  @Get('/hello-io')
  async getDelayedHello(): Promise<string> {  // ✅ 2-sec simulated delay (Non-blocking)
   // console.log(`Handled by PID: ${process.pid}`);
   const now = Date.now();

   if (now - lastUpdated > 10000) {
     console.log(`\n⏱️  Resetting counters after ${(now - lastUpdated) / 1000}s of inactivity...`);
     requestCounter.clear();
     globalRequestCount = 0;
     lastUpdated = now;
   }

   const pid = process.pid;
   const current = requestCounter.get(pid) || 0;
   requestCounter.set(pid, current + 1);

   globalRequestCount++;
   lastUpdated = now;

   if (globalRequestCount % 10000 === 0) {
     console.log(`\n--- Request count per PID after ${globalRequestCount} requests ---`);
     for (const [pid, count] of requestCounter.entries()) {
       console.log(`PID ${pid}: ${count} requests`);
     }
     console.log('---------------------------------------------------------');
   }

    await this.simulateAsyncCall();
    return "helloio";
  }
  @Get('/hello-both')
  async getDelayedHelloBoth(): Promise<string> {  // ✅ 2-sec simulated delay (Non-blocking)
    await this.simulateAsyncCall();
    const val = this.fibonacciRecursive(20)
    return "helloboth"+val;
  }
  @Get('/hello-both-r')
  async getDelayedHelloBothr(): Promise<string> {  // ✅ 2-sec simulated delay (Non-blocking)
    const val = this.fibonacciRecursive(20)
    await this.simulateAsyncCall();

    return "helloboth"+val;
  }
  private simulateAsyncCall(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 300)); // ✅ Non-blocking 2-sec delay
  }
}
