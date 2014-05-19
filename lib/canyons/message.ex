defmodule Canyons.Message do
  use GenServer.Behaviour

  def start_link() do
    :gen_server.start_link({:local, :canyons_message}, __MODULE__, [], [])
  end

  def handle_cast({ :push, message }, _state) do
    :gproc.send({:p, :l, :ye_olde_connection}, {:message, message})
    { :noreply, _state }
  end

  # api
  def push(message) do
    :gen_server.cast(:canyons_message, {:push, message})
  end
end
