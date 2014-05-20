defmodule Canyons do
  use Application
  import Canyons.Profiler

  def run do
    profile :testing do
      :timer.sleep(50)
    end
  end

  # See http://elixir-lang.org/docs/stable/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    # import Supervisor.Spec, warn: false

    # children = [
    #   # Define workers and child supervisors to be supervised
    #   worker(Canyons.Message, [])
    # ]

    # # See http://elixir-lang.org/docs/stable/Supervisor.html
    # # for other strategies and supported options
    # opts = [strategy: :one_for_one, name: Canyons.Supervisor]
    # Supervisor.start_link(children, opts)

    dispatch = :cowboy_router.compile([{:_, [
      {"/talk", Canyons.SocketHandler, []}
    ]}])

    :cowboy.start_http(:http, 100, [port: 8001], [env: [dispatch: dispatch]])
  end
end
