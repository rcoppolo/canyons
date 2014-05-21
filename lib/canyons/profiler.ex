defmodule Canyons.Profiler do

  @total_iterations 10

  defmacro profile(name, code_to_profile) do
    quote do
      timings = 1..unquote(@total_iterations) |> Enum.map(fn(_x) ->
        {time, _value} = :timer.tc(fn -> unquote(code_to_profile) end)
        time
      end)
      result = %{key: unquote(name), color_b: "tomato", timings: timings}
      Canyons.Message.push(:jsx.encode(result))
    end
  end

end
