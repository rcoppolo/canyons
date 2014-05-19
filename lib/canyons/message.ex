defmodule Canyons.Message do

  def push(message) do
    :gproc.send({:p, :l, :ye_olde_connection}, {:message, message})
  end

end
