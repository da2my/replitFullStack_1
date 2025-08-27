import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  LogOut, 
  User, 
  Brain, 
  MessageSquare, 
  FileText,
  TrendingUp,
  Sparkles,
  Activity,
  Settings,
  Bell,
  Search,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";

// AI Task schema
const aiTaskSchema = z.object({
  task_type: z.enum(['text_analysis', 'sentiment_analysis', 'image_processing', 'content_generation']),
  text: z.string().min(10, "El texto debe tener al menos 10 caracteres"),
  prompt: z.string().optional()
});

type AITaskForm = z.infer<typeof aiTaskSchema>;

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface AITask {
  id: string;
  user_id: string;
  task_type: string;
  status: string;
  input_data: any;
  output_data?: any;
  error_message?: string;
  processing_time?: number;
  created_at: string;
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const { toast } = useToast();
  const token = localStorage.getItem("access_token");

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      window.location.href = "/auth";
    }
  }, [token]);

  // Form for AI tasks
  const aiTaskForm = useForm<AITaskForm>({
    resolver: zodResolver(aiTaskSchema),
    defaultValues: {
      task_type: "text_analysis",
      text: "",
      prompt: ""
    }
  });

  // Get current user
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/auth/me", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener usuario");
      }
      return response.json();
    },
    enabled: !!token
  });

  // Get user's AI tasks
  const { data: aiTasks, isLoading: tasksLoading, refetch: refetchTasks } = useQuery<AITask[]>({
    queryKey: ['/api/ai/tasks'],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/ai/tasks", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener tareas");
      }
      return response.json();
    },
    enabled: !!token,
    refetchInterval: 3000 // Refresh every 3 seconds to see task updates
  });

  // Create AI task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (data: AITaskForm) => {
      const requestData = {
        task_type: data.task_type,
        input_data: data.task_type === 'content_generation' 
          ? { prompt: data.prompt || data.text }
          : { text: data.text }
      };

      const response = await fetch("http://localhost:8000/api/ai/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error al crear tarea");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Tarea creada exitosamente",
        description: "Tu solicitud está siendo procesada",
      });
      aiTaskForm.reset();
      refetchTasks();
    },
    onError: (error: Error) => {
      toast({
        title: "Error al crear tarea",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
    window.location.href = "/";
  };

  const onSubmitAITask = (data: AITaskForm) => {
    createTaskMutation.mutate(data);
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="text-primary-foreground w-4 h-4" />
              </div>
              <span className="text-xl font-bold" data-testid="text-dashboard-logo">AI Service</span>
            </div>
            <nav className="hidden md:flex space-x-6 ml-8">
              <Button
                variant={activeSection === "overview" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("overview")}
                data-testid="button-nav-overview"
              >
                Vista General
              </Button>
              <Button
                variant={activeSection === "ai-tasks" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("ai-tasks")}
                data-testid="button-nav-ai-tasks"
              >
                Tareas IA
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span data-testid="text-user-name">
                {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="space-y-8">
            {/* Welcome Card */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5" data-testid="card-welcome">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2" data-testid="heading-welcome">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>¡Bienvenido al Servicio de IA!</span>
                </CardTitle>
                <CardDescription data-testid="text-welcome-description">
                  Procesa texto, analiza sentimientos y genera contenido usando inteligencia artificial
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card data-testid="card-stats-total">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tareas</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-total-tasks">
                    {aiTasks?.length || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tareas creadas en total
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-stats-completed">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completadas</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600" data-testid="text-completed-tasks">
                    {aiTasks?.filter(task => task.status === 'completed').length || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tareas completadas exitosamente
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-stats-processing">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
                  <Loader2 className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600" data-testid="text-processing-tasks">
                    {aiTasks?.filter(task => task.status === 'processing').length || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tareas siendo procesadas
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card data-testid="card-quick-actions">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2" data-testid="heading-quick-actions">
                  <Plus className="w-5 h-5" />
                  <span>Acciones Rápidas</span>
                </CardTitle>
                <CardDescription>
                  Selecciona una tarea de IA para comenzar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto flex-col space-y-2 p-6"
                    onClick={() => setActiveSection("ai-tasks")}
                    data-testid="button-quick-text-analysis"
                  >
                    <FileText className="w-6 h-6" />
                    <span className="text-sm">Análisis de Texto</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col space-y-2 p-6"
                    onClick={() => setActiveSection("ai-tasks")}
                    data-testid="button-quick-sentiment"
                  >
                    <MessageSquare className="w-6 h-6" />
                    <span className="text-sm">Análisis de Sentimientos</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col space-y-2 p-6"
                    onClick={() => setActiveSection("ai-tasks")}
                    data-testid="button-quick-generation"
                  >
                    <Sparkles className="w-6 h-6" />
                    <span className="text-sm">Generar Contenido</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col space-y-2 p-6"
                    onClick={() => setActiveSection("ai-tasks")}
                    data-testid="button-quick-processing"
                  >
                    <Brain className="w-6 h-6" />
                    <span className="text-sm">Procesamiento IA</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Tasks Section */}
        {activeSection === "ai-tasks" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold" data-testid="heading-ai-tasks">Tareas de Inteligencia Artificial</h1>
            </div>

            {/* Create Task Form */}
            <Card data-testid="card-create-task">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2" data-testid="heading-create-task">
                  <Plus className="w-5 h-5" />
                  <span>Crear Nueva Tarea</span>
                </CardTitle>
                <CardDescription>
                  Selecciona el tipo de procesamiento y proporciona el contenido
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...aiTaskForm}>
                  <form onSubmit={aiTaskForm.handleSubmit(onSubmitAITask)} className="space-y-4">
                    <FormField
                      control={aiTaskForm.control}
                      name="task_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Tarea</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {[
                                { value: 'text_analysis', label: 'Análisis de Texto', icon: FileText },
                                { value: 'sentiment_analysis', label: 'Análisis de Sentimientos', icon: MessageSquare },
                                { value: 'content_generation', label: 'Generación de Contenido', icon: Sparkles },
                                { value: 'image_processing', label: 'Procesamiento de Imagen', icon: Brain }
                              ].map((option) => {
                                const Icon = option.icon;
                                return (
                                  <Button
                                    key={option.value}
                                    type="button"
                                    variant={field.value === option.value ? "default" : "outline"}
                                    className="h-auto flex-col space-y-2 p-4"
                                    onClick={() => field.onChange(option.value)}
                                    data-testid={`button-task-type-${option.value}`}
                                  >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-xs text-center">{option.label}</span>
                                  </Button>
                                );
                              })}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={aiTaskForm.control}
                      name="text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {aiTaskForm.watch("task_type") === 'content_generation' 
                              ? 'Prompt para Generación' 
                              : 'Texto a Procesar'}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder={
                                aiTaskForm.watch("task_type") === 'content_generation'
                                  ? "Escribe un artículo sobre inteligencia artificial..."
                                  : "Ingresa el texto que deseas procesar..."
                              }
                              className="min-h-[100px]"
                              data-testid="textarea-task-text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={createTaskMutation.isPending}
                      data-testid="button-submit-task"
                    >
                      {createTaskMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creando Tarea...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Crear Tarea
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Tasks List */}
            <Card data-testid="card-tasks-list">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2" data-testid="heading-tasks-list">
                  <Activity className="w-5 h-5" />
                  <span>Mis Tareas</span>
                </CardTitle>
                <CardDescription>
                  Historial de tareas de procesamiento de IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tasksLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : aiTasks && aiTasks.length > 0 ? (
                  <div className="space-y-4">
                    {aiTasks.map((task) => (
                      <Card key={task.id} className="border-l-4 border-l-primary/20" data-testid={`task-${task.id}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" data-testid={`task-type-${task.id}`}>
                                  {task.task_type.replace('_', ' ').toUpperCase()}
                                </Badge>
                                <Badge 
                                  className={getTaskStatusColor(task.status)}
                                  data-testid={`task-status-${task.id}`}
                                >
                                  {getTaskStatusIcon(task.status)}
                                  <span className="ml-1">{task.status.toUpperCase()}</span>
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground" data-testid={`task-input-${task.id}`}>
                                <strong>Entrada:</strong> {
                                  task.input_data?.text?.substring(0, 100) ||
                                  task.input_data?.prompt?.substring(0, 100) ||
                                  "Sin texto"
                                }
                                {(task.input_data?.text?.length > 100 || task.input_data?.prompt?.length > 100) && "..."}
                              </p>
                              {task.output_data && (
                                <div className="mt-2 p-3 bg-secondary/50 rounded-md" data-testid={`task-output-${task.id}`}>
                                  <p className="text-sm"><strong>Resultado:</strong></p>
                                  <pre className="text-xs mt-1 whitespace-pre-wrap">
                                    {JSON.stringify(task.output_data, null, 2)}
                                  </pre>
                                </div>
                              )}
                              {task.error_message && (
                                <div className="mt-2 p-3 bg-red-100 dark:bg-red-900/20 rounded-md" data-testid={`task-error-${task.id}`}>
                                  <p className="text-sm text-red-800 dark:text-red-300">
                                    <strong>Error:</strong> {task.error_message}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="text-right text-xs text-muted-foreground ml-4">
                              <div data-testid={`task-date-${task.id}`}>
                                {new Date(task.created_at).toLocaleString()}
                              </div>
                              {task.processing_time && (
                                <div className="mt-1" data-testid={`task-time-${task.id}`}>
                                  {task.processing_time}ms
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground" data-testid="text-no-tasks">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No has creado ninguna tarea aún</p>
                    <p className="text-sm">Crea tu primera tarea de IA usando el formulario de arriba</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}