// backend/src/app.service.ts
import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class AppService {
  getPrediction(exp: number): number {
    try {
      // .trim() lagana bohat zaroori hai extra spaces hatane ke liye
      const result = execSync(`python ../ml_logic/predict.py ${exp}`).toString().trim();
      
      const parsedResult = parseFloat(result);
      
      // Agar result number nahi hai toh error throw karein
      if (isNaN(parsedResult)) {
        console.error("Python output is not a number:", result);
        return 0;
      }
      
      return parsedResult;
    } catch (error) {
      console.error("Exec error:", error);
      return 0;
    }
  }
}