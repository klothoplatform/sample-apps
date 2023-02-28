using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
namespace IntegrationTests
{
    public class IntegrationTests
    {
        String endpoint = System.Environment.GetEnvironmentVariable("API_ENDPOINT");
        private readonly HttpClient client = new HttpClient();

        [Fact]
        public async Task TestBaseEndpoint()
        {
            var response = await client.GetAsync(endpoint+"/");
            Console.WriteLine(response.Content.ReadAsStringAsync());
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.Contains("Welcome to running ASP.NET Core on AWS Lambda", responseString);

        }
        [Fact]
        public async Task TestValuesApiBase()
        {
            var response = await client.GetAsync(endpoint+"/api/values");
            Console.WriteLine(response.Content.ReadAsStringAsync());
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.Contains($"Hello World from inside a lambda {DateTime.Now}", responseString);

        }

        [Fact]
        public async Task TestValuesApiId()
        {
            var id = "1";
            var response = await client.GetAsync(endpoint+$"/api/values/{id}");
            Console.WriteLine(response.Content.ReadAsStringAsync());
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.Contains($"You asked for {id}", responseString);
        }

       [Fact]
        public async Task TestValuesApiPostPerson()
        {
            var firstName = "john";
            var lastName = "doe";
            var jsonString = $"{{ \"FirstName\": \"{firstName}\", \"LastName\": \"{lastName}\" }}";
            var content = new StringContent(jsonString, System.Text.Encoding.UTF8, "application/json");
            var response = await client.PostAsync(endpoint+$"/api/values", content);
            Console.WriteLine(response.Content.ReadAsStringAsync());
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.Contains("You sent john doe", responseString);
        }
    }
}