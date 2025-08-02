
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2, Info, Save, Database, Shield, Mail, Bell, Smartphone, MessageSquare } from 'lucide-react';

const Settings = () => {
  const [apiKey, setApiKey] = useState('wht_s3cr3t_t0k3n_12345');
  const [webhookUrl, setWebhookUrl] = useState('https://api.example.com/webhook/mvura');
  
  const handleSaveGeneral = () => {
    toast.success('Configurações gerais salvas com sucesso!');
  };
  
  const handleSaveAPI = () => {
    toast.success('Configurações de API salvas com sucesso!');
  };
  
  const handleRegenerate = () => {
    setApiKey('wht_n3w_t0k3n_' + Math.random().toString(36).substring(2, 10));
    toast.success('Nova chave de API gerada com sucesso!');
  };

  return (
    <Layout title="Configurações" description="Personalize as configurações do sistema.">
      <div className="space-y-6 animate-fade-in">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="integration">Integrações</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="general" className="space-y-6">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Informações da Empresa</CardTitle>
                  <CardDescription>
                    Atualize as informações básicas da sua empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Nome da Empresa</Label>
                      <Input id="company_name" defaultValue="Águas da Região Centro" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_email">E-mail de Contato</Label>
                      <Input id="contact_email" type="email" defaultValue="contato@aguas.co.mz" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone Principal</Label>
                      <Input id="phone" defaultValue="+258 21 123 4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="support_phone">Telefone de Suporte</Label>
                      <Input id="support_phone" defaultValue="+258 84 987 6543" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Textarea id="address" defaultValue="Av. Eduardo Mondlane, 123, Chimoio, Moçambique" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveGeneral}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Aparência do Sistema</CardTitle>
                  <CardDescription>
                    Personalize a aparência e o comportamento do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma do Sistema</Label>
                      <Select defaultValue="pt">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Selecione o idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt">Português</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Fuso Horário</Label>
                      <Select defaultValue="africa_maputo">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Selecione o fuso horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="africa_maputo">África/Maputo (GMT+2)</SelectItem>
                          <SelectItem value="africa_cairo">África/Cairo (GMT+2)</SelectItem>
                          <SelectItem value="europe_lisbon">Europa/Lisboa (GMT+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark_mode">Modo Escuro</Label>
                        <p className="text-sm text-muted-foreground">
                          Ativar tema escuro para o sistema
                        </p>
                      </div>
                      <Switch id="dark_mode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="compact_view">Visualização Compacta</Label>
                        <p className="text-sm text-muted-foreground">
                          Reduzir espaçamento e tamanho dos elementos
                        </p>
                      </div>
                      <Switch id="compact_view" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveGeneral}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Configurações de Notificações</CardTitle>
                  <CardDescription>
                    Personalize como e quando receber notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                      <Mail className="h-5 w-5 text-mvura-600" />
                      Notificações por E-mail
                    </h3>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email_new_ticket">Novos chamados</Label>
                          <p className="text-sm text-muted-foreground">
                            Receber e-mail quando um novo chamado for criado
                          </p>
                        </div>
                        <Switch id="email_new_ticket" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email_ticket_update">Atualizações de chamados</Label>
                          <p className="text-sm text-muted-foreground">
                            Receber e-mail quando um chamado for atualizado
                          </p>
                        </div>
                        <Switch id="email_ticket_update" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email_client_register">Registro de clientes</Label>
                          <p className="text-sm text-muted-foreground">
                            Receber e-mail quando um novo cliente for registrado
                          </p>
                        </div>
                        <Switch id="email_client_register" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                      <Bell className="h-5 w-5 text-mvura-600" />
                      Notificações no Sistema
                    </h3>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="system_new_ticket">Novos chamados</Label>
                          <p className="text-sm text-muted-foreground">
                            Exibir notificação no sistema quando um novo chamado for criado
                          </p>
                        </div>
                        <Switch id="system_new_ticket" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="system_assigned_ticket">Chamados atribuídos</Label>
                          <p className="text-sm text-muted-foreground">
                            Exibir notificação quando um chamado for atribuído a você
                          </p>
                        </div>
                        <Switch id="system_assigned_ticket" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="system_comment">Comentários</Label>
                          <p className="text-sm text-muted-foreground">
                            Exibir notificação quando houver um novo comentário em um chamado
                          </p>
                        </div>
                        <Switch id="system_comment" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                      <Smartphone className="h-5 w-5 text-mvura-600" />
                      Notificações SMS
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms_critical">Chamados críticos</Label>
                          <p className="text-sm text-muted-foreground">
                            Enviar SMS para chamados com prioridade crítica
                          </p>
                        </div>
                        <Switch id="sms_critical" defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sms_recipients">Destinatários SMS</Label>
                        <Input id="sms_recipients" defaultValue="+258 84 123 4567, +258 86 765 4321" />
                        <p className="text-xs text-muted-foreground">
                          Lista de números separados por vírgula
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => toast.success('Configurações de notificações salvas!')}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Integração com WhatsApp</CardTitle>
                  <CardDescription>
                    Configure a integração com o bot do WhatsApp
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-green-100 text-green-800 gap-1 py-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Ativo
                    </Badge>
                    <Badge className="ml-2 bg-blue-100 text-blue-800 border-0">Versão 1.2.0</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api_key">Chave de API</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="api_key" 
                        value={apiKey} 
                        onChange={(e) => setApiKey(e.target.value)} 
                        type="password"
                        className="font-mono"
                      />
                      <Button variant="outline" onClick={handleRegenerate}>
                        Regenerar
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Info className="h-3.5 w-3.5" />
                      Use esta chave para autenticar seu bot do WhatsApp
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhook_url">URL do Webhook</Label>
                    <Input 
                      id="webhook_url" 
                      value={webhookUrl} 
                      onChange={(e) => setWebhookUrl(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Este é o endpoint para o qual o sistema enviará atualizações
                    </p>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label className="text-base">Exemplos de uso da API:</Label>
                    <div className="bg-muted rounded-md p-4 overflow-auto max-h-36">
                      <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
{`// Criar um novo chamado
POST /api/tickets
{
  "cliente_id": 123,
  "tipo_problema": "Falta de água",
  "prioridade": "Alta",
  "descricao": "Sem abastecimento há 2 dias."
}

// Consultar status do chamado  
GET /api/tickets/456
`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable_whatsapp">Habilitar Integração</Label>
                        <p className="text-sm text-muted-foreground">
                          Ativar ou desativar a integração com WhatsApp
                        </p>
                      </div>
                      <Switch id="enable_whatsapp" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveAPI}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Outras Integrações</CardTitle>
                  <CardDescription>
                    Configure integrações adicionais com outros sistemas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-6 w-6 text-mvura-600" />
                      <div>
                        <h4 className="font-medium">SMS Gateway</h4>
                        <p className="text-sm text-muted-foreground">Integre com serviços de envio de SMS</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground">Em breve</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Mail className="h-6 w-6 text-mvura-600" />
                      <div>
                        <h4 className="font-medium">Servidor de E-mail</h4>
                        <p className="text-sm text-muted-foreground">Configure o envio de e-mails pelo sistema</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground">Em breve</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backup" className="space-y-6">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Backup do Sistema</CardTitle>
                  <CardDescription>
                    Configure backups automáticos e faça backups manuais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                      <Database className="h-5 w-5 text-mvura-600" />
                      Backup Automático
                    </h3>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="enable_auto_backup">Habilitar backup automático</Label>
                          <p className="text-sm text-muted-foreground">
                            Realizar backups automáticos periodicamente
                          </p>
                        </div>
                        <Switch id="enable_auto_backup" defaultChecked />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="backup_frequency">Frequência</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="backup_frequency">
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diário</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="monthly">Mensal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="backup_time">Horário do Backup</Label>
                        <Input id="backup_time" type="time" defaultValue="02:00" />
                        <p className="text-xs text-muted-foreground">
                          Recomendado em horários de baixo uso do sistema
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="retention_period">Período de Retenção</Label>
                        <Select defaultValue="30">
                          <SelectTrigger id="retention_period">
                            <SelectValue placeholder="Selecione o período" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 dias</SelectItem>
                            <SelectItem value="14">14 dias</SelectItem>
                            <SelectItem value="30">30 dias</SelectItem>
                            <SelectItem value="90">90 dias</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Backups mais antigos serão automaticamente excluídos
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                      <Shield className="h-5 w-5 text-mvura-600" />
                      Backup Manual
                    </h3>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Crie um backup manual completo do sistema, incluindo dados de clientes, chamados e configurações.
                      </p>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Iniciar Backup Manual
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Backups Recentes</h3>
                    <div className="border rounded-md divide-y">
                      <div className="flex items-center justify-between p-3">
                        <div>
                          <p className="font-medium">backup_28_11_2023.zip</p>
                          <p className="text-sm text-muted-foreground">28/11/2023 02:00 - 42.5 MB</p>
                        </div>
                        <Button variant="ghost" size="sm">Baixar</Button>
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <div>
                          <p className="font-medium">backup_27_11_2023.zip</p>
                          <p className="text-sm text-muted-foreground">27/11/2023 02:00 - 41.8 MB</p>
                        </div>
                        <Button variant="ghost" size="sm">Baixar</Button>
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <div>
                          <p className="font-medium">backup_26_11_2023.zip</p>
                          <p className="text-sm text-muted-foreground">26/11/2023 02:00 - 41.2 MB</p>
                        </div>
                        <Button variant="ghost" size="sm">Baixar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => toast.success('Configurações de backup salvas!')}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
