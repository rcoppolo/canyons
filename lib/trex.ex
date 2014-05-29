defmodule Trex do
  use Application
  import IEx.Helpers, only: [r: 1]

  @total_iterations 10

  def profile(module, function) do
    r(module)
    timings = 1..@total_iterations |> Enum.map(fn(_x) ->
      {time, _value} = :timer.tc(module, function, [])
      time
    end)
    result = %{key: "#{module}.#{function}", color_b: "tomato", timings: timings}
    Trex.Message.push(:jsx.encode(result))
  end

  # See http://elixir-lang.org/docs/stable/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    # import Supervisor.Spec, warn: false

    # children = [
    #   # Define workers and child supervisors to be supervised
    #   worker(Trex.Message, [])
    # ]

    # # See http://elixir-lang.org/docs/stable/Supervisor.html
    # # for other strategies and supported options
    # opts = [strategy: :one_for_one, name: Trex.Supervisor]
    # Supervisor.start_link(children, opts)

    dispatch = :cowboy_router.compile([{:_, [
      {"/talk", Trex.SocketHandler, []}
    ]}])

    :cowboy.start_http(:http, 100, [port: 8001], [env: [dispatch: dispatch]])
  end
end
