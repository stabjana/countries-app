import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from '../services/supabase.service';

@Controller('test')
export class TestController {
  // handles requests - is defining endpoint
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get('ping') // endpoint - /ping
  async ping() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('supabase') // endpoint - /supabase
  async testConnection() {
    try {
      const { data, error } = await this.supabaseService.supabase
        .from('test')
        .select('*')
        .limit(50);

      if (error) throw error;
      return {
        status: 'Connected to Supabase!',
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'Connection failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
