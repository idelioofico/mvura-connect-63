
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

type CreateTicketModalProps = {
  open: boolean;
  onClose: () => void;
  clientId?: string;
  clientName?: string;
};

const CreateTicketModal = ({ open, onClose, clientId, clientName }: CreateTicketModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Ticket criado com sucesso!");
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Ticket</DialogTitle>
          <DialogDescription>
            {clientName 
              ? `Criar novo ticket para o cliente ${clientName}` 
              : 'Preencha os detalhes do ticket abaixo.'
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {!clientId && (
              <div className="space-y-2">
                <Label htmlFor="client">Cliente *</Label>
                <Select required>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cl-123">João Silva</SelectItem>
                    <SelectItem value="cl-456">Prefeitura Municipal</SelectItem>
                    <SelectItem value="cl-789">Ana Pereira</SelectItem>
                    <SelectItem value="cl-321">Mercado Central</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">Título do Ticket *</Label>
              <Input 
                id="title" 
                placeholder="Descreva o problema brevemente" 
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select 
                  required
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Falta de Água">Falta de Água</SelectItem>
                    <SelectItem value="Problemas no Contador">Problemas no Contador</SelectItem>
                    <SelectItem value="Qualidade da Água">Qualidade da Água</SelectItem>
                    <SelectItem value="Vazamento Visível">Vazamento Visível</SelectItem>
                    <SelectItem value="Baixa Pressão da Água">Baixa Pressão da Água</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade *</Label>
                <Select 
                  required
                  value={formData.priority}
                  onValueChange={(value) => handleSelectChange('priority', value)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Crítica">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignee">Atribuir para</Label>
              <Select>
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="Selecione um atendente (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mo">Maria Oliveira</SelectItem>
                  <SelectItem value="cs">Carlos Santos</SelectItem>
                  <SelectItem value="pl">Pedro Lima</SelectItem>
                  <SelectItem value="lf">Luísa Fernandes</SelectItem>
                  <SelectItem value="rm">Rafael Mendes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição Detalhada *</Label>
              <Textarea 
                id="description" 
                placeholder="Forneça detalhes sobre o problema" 
                rows={4} 
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={onClose} 
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Criando..." : "Criar Ticket"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTicketModal;
