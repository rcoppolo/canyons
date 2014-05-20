defmodule Canyons.Profiler do

  defmacro profile(name, code_to_profile) do
    quote do
      1..10 |> Enum.map(fn(_x) ->
        {time, _value} = :timer.tc(fn -> unquote(code_to_profile) end)
        time
      end)
    end
  end

end
