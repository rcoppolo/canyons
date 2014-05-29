defmodule Trex.SocketHandler do
  @behaviour :cowboy_websocket_handler
  def init({:tcp, :http}, _req, _opts) do
    { :upgrade, :protocol, :cowboy_websocket }
  end
  def websocket_init(_transport_name, req, _opts) do
    :gproc.reg({ :p, :l, :ye_olde_connection })
    { :ok, req, :no_state }
  end
  def websocket_info({ :message, message }, req, state) do
    { :reply, { :text, message }, req, state }
  end
  def websocket_handle({ :text, message }, req, state) do
    { :reply, { :text, message }, req, state }
  end
  def websocket_terminate(_reason, _req, _state), do: :ok
end
