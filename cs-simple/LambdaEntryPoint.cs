using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Amazon.Lambda.AspNetCoreServer;

namespace SampleApp
{
  public class LambdaEntryPoint : APIGatewayHttpApiV2ProxyFunction
  {
    protected override void Init(IWebHostBuilder builder)
    {
      builder
          .UseStartup<Startup>();
    }

    protected override void Init(IHostBuilder builder)
    {
    }
  }
}
