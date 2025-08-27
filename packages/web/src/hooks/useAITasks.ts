import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiService, type AITask } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export function useAITasks() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get all AI tasks
  const {
    data: tasks,
    isLoading,
    error,
    refetch
  } = useQuery<AITask[]>({
    queryKey: ['ai-tasks'],
    queryFn: aiService.getTasks,
    refetchInterval: 3000, // Refetch every 3 seconds to get updates
    staleTime: 1000, // Consider data stale after 1 second
  });

  // Create AI task mutation
  const createTaskMutation = useMutation({
    mutationFn: aiService.createTask,
    onSuccess: () => {
      toast({
        title: "Tarea creada exitosamente",
        description: "Tu solicitud está siendo procesada",
      });
      queryClient.invalidateQueries({ queryKey: ['ai-tasks'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error al crear tarea",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  return {
    tasks: tasks || [],
    isLoading,
    error,
    refetch,
    createTask: createTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    completedTasks: tasks?.filter(task => task.status === 'completed') || [],
    processingTasks: tasks?.filter(task => task.status === 'processing') || [],
    failedTasks: tasks?.filter(task => task.status === 'failed') || [],
  };
}

export function useAITask(taskId: string) {
  return useQuery<AITask>({
    queryKey: ['ai-task', taskId],
    queryFn: () => aiService.getTask(taskId),
    enabled: !!taskId,
  });
}