import { AlertCircle, FileCheck, Search } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function ErrorAnalysisDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dados principais
  const totalLancamentos = 3960;
  const lancamentosComErros = 1113;
  const percentualErros = 28.11;
  const totalVeiculosRodadosAbril = 267;
  const veiculosComErrosAbril = 175;
  const percentualVeiculosComErro = 65.5;

  // Dados de KM e Litros
  const kmTotalComErros = 2273140;
  const kmTotalSemErros = 1994610;
  const kmTotalAbr2022 = 1864107;
  const kmRemovido = kmTotalComErros - kmTotalSemErros;
  const percentualKmRemovido = ((kmRemovido / kmTotalComErros) * 100).toFixed(
    2
  );

  const litrosTotalComErros = 808198.3;
  const litrosTotalSemErros = 705496.3;
  const litrosTotalAbr2022 = 783296;
  const litrosRemovido = litrosTotalComErros - litrosTotalSemErros;
  const percentualLitrosRemovido = (
    (litrosRemovido / litrosTotalComErros) *
    100
  ).toFixed(2);

  // Calcular médias
  const mediaKmPorLitroComErros = (
    kmTotalComErros / litrosTotalComErros
  ).toFixed(2);
  const mediaKmPorLitroSemErros = (
    kmTotalSemErros / litrosTotalSemErros
  ).toFixed(2);

  // Economia em abril (valor do diesel = R$4,8364)
  const valorDiesel = 4.8364;
  const economiaLitrosAbril = litrosRemovido;
  const economiaDinheiroAbril = economiaLitrosAbril * valorDiesel;

  // Lista de veículos com erro
  const veiculosComErroList = [
    1, 4, 5, 7, 8, 10, 11, 14, 16, 139, 146, 147, 148, 149, 150, 152, 153, 154,
    155, 156, 161, 164, 165, 166, 168, 169, 179, 110001, 110003, 110005, 110006,
    110007, 110010, 110012, 110013, 110014, 110015, 110017, 110018, 110019,
    110021, 110023, 110028, 110032, 110033, 110035, 110036, 110038, 110040,
    110047, 110051, 110053, 110056, 110058, 110060, 110061, 110062, 110063,
    110068, 110071, 110072, 110073, 110075, 110077, 110079, 110080, 110083,
    110084, 110088, 110090, 110091, 110092, 110095, 110096, 110097, 110098,
    110107, 110115, 110117, 110119, 110123, 110125, 110128, 110131, 110132,
    110133, 110136, 110137, 110140, 110142, 110143, 110146, 110153, 110155,
    110159, 110160, 110162, 110164, 110165, 110166, 110167, 110169, 110170,
    110171, 110172, 110175, 110176, 110185, 110187, 110188, 110190, 110198,
    110201, 110206, 110207, 110210, 110222, 110223, 110228, 110229, 110230,
    110235, 110242, 110243, 110245, 110252, 110259, 110271, 110273, 110275,
    110276, 110279, 110280, 110281, 110282, 110285, 110288, 110295, 110297,
    110304, 110308, 110309, 110311, 110315, 110320, 110321, 110325, 110349,
    110352, 110356, 110358, 110360, 110367, 110368, 110369, 110370, 110372,
    110373, 110375, 110378, 110379, 110380, 110381, 110382, 110385, 110386,
    110387, 110388, 110392, 110393, 110394, 110396, 110397, 110398, 110399,
  ];

  // Filtragem de veículos por termo de busca
  const filteredVehicles = veiculosComErroList.filter((vehicle) =>
    vehicle.toString().includes(searchTerm)
  );

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVehicles.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  // Dados para os gráficos
  const pieData = [
    { name: "Com Erros", value: lancamentosComErros },
    { name: "Sem Erros", value: totalLancamentos - lancamentosComErros },
  ];

  const vehiclePieData = [
    { name: "Com Erros", value: veiculosComErrosAbril },
    {
      name: "Sem Erros",
      value: totalVeiculosRodadosAbril - veiculosComErrosAbril,
    },
  ];

  const consumoComparisonData = [
    {
      name: "Com Erros",
      km: kmTotalComErros,
      litros: litrosTotalComErros,
      media: mediaKmPorLitroComErros,
    },
    {
      name: "Sem Erros",
      km: kmTotalSemErros,
      litros: litrosTotalSemErros,
      media: mediaKmPorLitroSemErros,
    },
  ];

  // Cores para os gráficos
  const COLORS = ["#FFD700", "#4A5568"];

  return (
    <div className="flex flex-col text-zinc-900 p-6 rounded-lg min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-[#1f2022]">
            Reginas
          </h1>
          <span className="mx-2 text-amber-400">|</span>
          <h2 className="text-xl text-[#1f202280]">
            Análise de Erros de Lançamento
          </h2>
        </div>
        <span className="text-xs text-zinc-500">Atualizado em 12/05/2025</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Erro em Lançamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#D79B00]">
              {percentualErros}%
            </div>
            <p className="text-xs text-zinc-500">
              {lancamentosComErros} de {totalLancamentos} lançamentos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Veículos com Erros (Abril)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#D79B00]">
              {percentualVeiculosComErro}%
            </div>
            <p className="text-xs text-zinc-500">
              {veiculosComErrosAbril} de {totalVeiculosRodadosAbril} veículos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">KM Removido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#D79B00]">
              {percentualKmRemovido}%
            </div>
            <p className="text-xs text-zinc-500">
              {kmRemovido.toLocaleString()} de{" "}
              {kmTotalComErros.toLocaleString()} km
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Litros Removidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#D79B00]">
              {percentualLitrosRemovido}%
            </div>
            <p className="text-xs text-zinc-500">
              {litrosRemovido.toLocaleString()} de{" "}
              {litrosTotalComErros.toLocaleString()} L
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="comparativo" className="w-full mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="comparativo">Comparativo KM/Litros</TabsTrigger>
          <TabsTrigger value="metricas">Métricas</TabsTrigger>
          <TabsTrigger value="economia" >
            Economia
          </TabsTrigger>
        </TabsList>

        <TabsContent value="comparativo">
          <Card>
            <CardHeader>
              <CardTitle>Comparativo de KM e Litros</CardTitle>
              <CardDescription>
                Comparação entre dados com e sem erros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={consumoComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d4" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="km" name="KM" fill="#D79B00" />
                    <Bar
                      yAxisId="right"
                      dataKey="litros"
                      name="Litros"
                      fill="#1f2022"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">KM/L (Com Erros)</span>
                      <span className="text-sm font-medium">
                        {mediaKmPorLitroComErros}
                      </span>
                    </div>
                    <Progress
                      value={(mediaKmPorLitroComErros / 4) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">KM/L (Sem Erros)</span>
                      <span className="text-sm font-medium">
                        {mediaKmPorLitroSemErros}
                      </span>
                    </div>
                    <Progress
                      value={(mediaKmPorLitroSemErros / 4) * 100}
                      className="h-2"
                    />
                  </div>
                </div>

                <div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Melhoria na eficiência</AlertTitle>
                    <AlertDescription>
                      A correção de erros resultou em uma melhoria de{" "}
                      {(
                        (mediaKmPorLitroSemErros / mediaKmPorLitroComErros -
                          1) *
                        100
                      ).toFixed(2)}
                      % na eficiência de combustível.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="economia">
          <Card>
            <CardHeader>
              <CardTitle>Economia em Abril</CardTitle>
              <CardDescription>
                Baseado no preço do diesel a R$ 4,8364/L
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col justify-center items-center">
                  <div className="text-center mb-4">
                    <div className="text-sm text-zinc-500 mb-1">
                      Valor Economizado
                    </div>
                    <div className="text-4xl font-bold text-[#D79B00]">
                      R${" "}
                      {economiaDinheiroAbril.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-zinc-500 mb-1">
                      Litros Economizados
                    </div>
                    <div className="text-3xl font-bold text-[#D79B00]">
                      {economiaLitrosAbril.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      L
                    </div>
                    <div className="text-xs text-emerald-600 mt-1">
                      Equivalente a{" "}
                      {(
                        (economiaLitrosAbril / litrosTotalSemErros) *
                        100
                      ).toFixed(2)}
                      % do consumo após correção
                    </div>
                  </div>
                </div>

                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Economia", value: litrosRemovido },
                          { name: "Consumo Real", value: litrosTotalSemErros },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#facc15"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(1)}%`
                        }
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#D79B00" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metricas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Proporção de Lançamentos com Erros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#D79B00"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(1)}%`
                        }
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === 0 ? "#D79B00" : "#1f2022"}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Veículos com Erros em Abril</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vehiclePieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#D79B00"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(1)}%`
                        }
                      >
                        {vehiclePieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === 0 ? "#D79B00" : "#1f2022"}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileCheck className="h-5 w-5 mr-2" />
            Placas de Veículos com Erros de Lançamento
          </CardTitle>
          <CardDescription>
            Total: {veiculosComErroList.length} veículos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Buscar veículo por Placa..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="border rounded p-4">
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {currentItems.map((vehicle, index) => (
                  <div
                    key={index}
                    className="bg-zinc-100 p-2 rounded text-center"
                  >
                    {vehicle}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-zinc-500">
                Nenhum veículo encontrado com o termo de busca.
              </div>
            )}
          </div>

          {filteredVehicles.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-zinc-500">
                Mostrando {indexOfFirstItem + 1} a{" "}
                {Math.min(indexOfLastItem, filteredVehicles.length)} de{" "}
                {filteredVehicles.length} veículos
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none"
                >
                  {currentPage}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo e Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>
                Total de 3.960 lançamentos realizados, com 1.113 apresentando
                erros (28,11%).
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>
                Em abril, 65,5% da frota operacional apresentou pelo menos um
                erro de lançamento (175 de 267 veículos).
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>
                A correção dos erros resultou na remoção de{" "}
                {kmRemovido.toLocaleString()} km ({percentualKmRemovido}%) e{" "}
                {litrosRemovido.toLocaleString()} litros (
                {percentualLitrosRemovido}%).
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>
                A eficiência de combustível melhorou de{" "}
                {mediaKmPorLitroComErros} para {mediaKmPorLitroSemErros} km/L
                após a correção dos erros.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>
                A economia estimada para abril considerando o diesel a
                R$4,8364/L é de R${" "}
                {economiaDinheiroAbril.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                .
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
