using System;
using SampleApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace SampleApp.Controllers
{
  [Route("api/[controller]")]
  public class ValuesController : ControllerBase
  {
    // GET api/values
    [HttpGet]
    public string Get()
    {
      return $"Hello World from inside a lambda {DateTime.Now}";
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return $"You asked for {id}";
    }

    [HttpPost]
    public IActionResult Post([FromBody] Person person)
    {
      return Ok($"You sent {person.ToString()}");
    }
  }
}
