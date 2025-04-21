
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderService } from '@/lib/mockData';
import { Order, OrderStatus } from '@/types';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function AdminOrders() {
  const orders = orderService.getAll();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const handleStatusChange = (id: string, status: OrderStatus) => {
    orderService.updateStatus(id, status);
    
    // Update the selected order if it's currently shown in the dialog
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Manage customer orders
        </p>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {order.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={order.status}
                    onValueChange={(value) => 
                      handleStatusChange(order.id, value as OrderStatus)
                    }
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(OrderStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      {selectedOrder && (
                        <>
                          <DialogHeader>
                            <DialogTitle>Order #{selectedOrder.id}</DialogTitle>
                          </DialogHeader>
                          
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div>
                              <h3 className="font-medium">Customer Details</h3>
                              <p className="text-sm mt-1">{selectedOrder.customerName}</p>
                              <p className="text-sm">{selectedOrder.customerEmail}</p>
                              <p className="text-sm">{selectedOrder.customerAddress}</p>
                            </div>
                            <div>
                              <h3 className="font-medium">Order Details</h3>
                              <p className="text-sm mt-1">Date: {selectedOrder.createdAt.toLocaleDateString()}</p>
                              <p className="text-sm">Status: {selectedOrder.status}</p>
                              <p className="text-sm">Payment ID: {selectedOrder.paymentId}</p>
                            </div>
                          </div>
                          
                          <div className="border-t mt-2 pt-4">
                            <h3 className="font-medium mb-4">Items</h3>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Product</TableHead>
                                  <TableHead>Price</TableHead>
                                  <TableHead>Qty</TableHead>
                                  <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedOrder.items.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell>{item.productName}</TableCell>
                                    <TableCell>${item.productPrice.toFixed(2)}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className="text-right">
                                      ${(item.productPrice * item.quantity).toFixed(2)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell colSpan={3} className="text-right font-medium">
                                    Total:
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    ${selectedOrder.total.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
